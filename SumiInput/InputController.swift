import AppKit
import Cocoa
import InputMethodKit

let notFound = NSRange(location: NSNotFound, length: NSNotFound)

enum State {
    case text
    case context(String)
    case key(String, String)
}

enum Key: UInt16 {
    case backslash = 42
    case tab = 48
    case delete = 51
    case escape = 53
    case left = 123
    case right = 124
    case down = 125
    case up = 126
    case return_ = 36
}

@objc(InputController)
class InputController: IMKInputController {
    var candidates = IMKCandidates()

    var state: State {
        didSet {
            NSLog("InputController didSet \(state)")

            switch state {
            case .text:
                candidates.hide()
                candidates.update()
                client().setMarkedText(
                    "",
                    selectionRange: notFound,
                    replacementRange: notFound)

            case .context(let context):
                client().setMarkedText(
                    enterContext + context,
                    selectionRange: notFound,
                    replacementRange: notFound)

                candidates.update()
                candidates.show()

            case .key(let context, let key):
                client().setMarkedText(
                    "⦗\(dicts[context]!.0)⦘\(key)",
                    selectionRange: notFound,
                    replacementRange: notFound)

                candidates.update()
                candidates.show()
            }
        }
    }

    let enterContext = "\\"

    let joinSubkeys = "·"

    let joinKeyValue = " ▸ "

    override init!(server: IMKServer!, delegate: Any!, client inputClient: Any!)
    {
        NSLog("InputController init!")
        state = .text
        candidates = IMKCandidates(
            server: server, panelType: kIMKScrollingGridCandidatePanel)

        super.init(server: server, delegate: delegate, client: inputClient)
    }

    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        NSLog(
            "InputController handle state=\(state) keyCode=\(event.keyCode) characters=\(event.characters)"
        )

        guard let client = sender as? IMKTextInput else {
            return super.handle(event, client: sender)
        }

        switch event.keyCode {
        case Key.escape.rawValue:
            // escape key resets everything
            state = .text
            
        case Key.tab.rawValue:
            switch state {
            case .text:
                return super.handle(event, client: sender)
                
            case .context(let context):
                client.insertText(
                    enterContext + context, replacementRange: notFound)
                state = .text
                
            case .key(let context, let key):
                client.insertText(key, replacementRange: notFound)
                state = .key(context, "")
            }
            
        case Key.left.rawValue,
            Key.right.rawValue,
            Key.down.rawValue,
            Key.up.rawValue:
            switch state {
            case .text:
                return super.handle(event, client: sender)
            default:
                candidates.interpretKeyEvents([event])
            }
            
        case Key.return_.rawValue:
            switch state {
            case .text, .key(_, ""):
                // FIXME: context disappears
                return super.handle(event, client: sender)

            default:
                candidates.interpretKeyEvents([event])
            }

        case Key.delete.rawValue:
            switch state {
            case .text:
                return super.handle(event, client: sender)

            case .context(""):
                state = .text

            case .context(let context):
                state = .context(String(context.dropLast()))

            case .key(_, ""):
                NSLog("delete in context")
                // delete a letter to the left of buffer
                // FIXME: replacementRange is ignored
                client.insertText(
                    "",
                    replacementRange: NSRange(
                        location: client.markedRange().location - 1, length: 1))

            case .key(let context, let key):
                state = .key(context, String(key.dropLast()))
            }

        default:
            if event.characters == enterContext, case .text = state {
                state = .context("")
            } else if event.characters == enterContext,
                case .context("") = state
            {
                client.insertText("\\", replacementRange: notFound)
                state = .text
            } else {
                // input
                switch state {
                case .text:
                    client.insertText(
                        event.characters, replacementRange: notFound)

                case .context(let context):
                    let contextNew = String(context + (event.characters ?? ""))
                    state = .context(contextNew)

                case .key(let context, let key):
                    state = .key(context, key + (event.characters ?? ""))
                }
            }
        }

        return true
    }

    override func candidates(_ sender: Any!) -> [Any]! {
        NSLog("InputController candidates")

        if case .context(let context) = state {
            return filterContexts(context)
        } else if case .key(let context, let key) = state,
            let (_, dict) = dicts[context]
        {
            return filterKeys(dict, key)
        }

        return []
    }

    func filterContexts(_ context: String) -> [String] {
        dicts
            .compactMap {
                if context == "" {
                    return ($0.key.startIndex, $0.key, $0.value.0)
                } else if let range = $0.key.range(of: context) {
                    return (range.lowerBound, $0.key, $0.value.0)
                } else {
                    return nil
                }
            }
            .sorted(by: { (a, b) in
                (a.0, a.1.count, a.1) < (b.0, b.1.count, b.1)
            })
            .map { $0.1 + joinKeyValue + $0.2 }
    }

    func matchKeys(
        _ dict: [String: [String]],
        _ key: String
    ) -> [(String, String)] {
        if key == "" {
            return []
        }
        
        // exact key
        if let words = dict[key] {
            return words.map { (key, $0) }
        }
        
        // seek for superkeys
        let filtered: [(String.Index, String, [String])] =
            dict
            .compactMap { e in
                if key == "" {
                    return (e.key.startIndex, e.key, e.value)
                } else if let index = e.key.range(of: key)?.lowerBound {
                    return (index, e.key, e.value)
                } else {
                    return nil
                }
            }
        
         /* sort by
          * - earlier match
          * - shorter key (higher match rate)
          * - word
          */
        if !filtered.isEmpty {
            return filtered
                .flatMap { a in a.2.map { w in (a.0, a.1, w) } }
                .sorted { a, b in (a.0, a.1.count, a.2) < (b.0, b.1.count, a.2) }
                .map { ($0.1, $0.2) }
        }
            
        // split into subkeys
        // FIXME: too procedural
        var subkeys: [String] = []
        var keyRemain = key
        var nDrop = 1
        while nDrop < keyRemain.count {
            let subkey = String(keyRemain.dropLast(nDrop))
            if dict.keys.contains(subkey) {
                subkeys.append(subkey)
                keyRemain = String(keyRemain.dropFirst(keyRemain.count - nDrop))
                nDrop = 0
            } else {
                nDrop += 1
            }
        }

        // check words of longer key
        return [(
            subkeys.joined(separator: joinSubkeys),
            subkeys
                .map { subkey in dict[subkey]!.sorted().first! }
                .joined(separator: "")
         )]
    }

    func filterKeys(_ dict: [String: [String]], _ key: String) -> [String] {
        return matchKeys(dict, key).map { $0.0.replacingOccurrences(of: " ", with: "␣") + joinKeyValue + $0.1 }
    }

    override func candidateSelected(_ candidateString: NSAttributedString!) {
        switch state {
        case .text:
            fatalError("should not select in text mode")

        case .context(_):
            NSLog(candidateString.string)
            state = .key(
                fromCandidate(candidateString.string, joinKeyValue).0,
                "")

        case .key(let context, let key):
            let (keySelected, word) = fromCandidate(
                candidateString.string, joinKeyValue)
            self.client().insertText(
                word,
                replacementRange: notFound)

            state = .key(
                context,
                key.replacingOccurrences(
                    of: keySelected.replacingOccurrences(
                        of: joinSubkeys, with: ""),
                    with: "")
            )
        }
    }

    func fromCandidate(_ candidate: String, _ separator: String) -> (
        String, String
    ) {
        let keyWithWord = candidate.unicodeScalars.split(
            separator: separator.unicodeScalars,
            omittingEmptySubsequences: false
        ).map { String($0) }

        return (keyWithWord[0].replacingOccurrences(of: "␣", with: " "), keyWithWord[1])
    }

    override func deactivateServer(_ sender: Any!) {
        NSLog("InputController deactivateServer")
        candidates.hide()
    }
}
