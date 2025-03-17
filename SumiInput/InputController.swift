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
                self.client().setMarkedText(
                    "",
                    selectionRange: notFound,
                    replacementRange: notFound)

            case .context(let context):
                NSLog("InputController didSet .selectDict(\(context))")

                self.client().setMarkedText(
                    NSAttributedString(
                        string: letterKey + context,
                        attributes: self.mark(
                            forStyle: kTSMHiliteSelectedConvertedText,
                            at: NSMakeRange(NSNotFound, 0)
                        ) as? [NSAttributedString.Key: Any]),
                    selectionRange: notFound,
                    replacementRange: notFound)

                candidates.update()
                candidates.show()

            case .key(let context, let key):
                NSLog("InputController toSelect(\(context), \(key))")

                let nameDict = dicts[context]!.0

                self.client().setMarkedText(
                    NSAttributedString(
                        string: "[\(nameDict)]\(key)",
                        attributes: self.mark(
                            forStyle: kTSMHiliteSelectedConvertedText,
                            at: NSMakeRange(NSNotFound, 0)
                        ) as? [NSAttributedString.Key: Any]),
                    selectionRange: notFound,
                    replacementRange: notFound)

                candidates.update()
                candidates.show()
            }
        }
    }

    let letterKey = "\\"

    override init!(server: IMKServer!, delegate: Any!, client inputClient: Any!)
    {
        NSLog("InputController init!")
        state = .text
        candidates = IMKCandidates(
            server: server, panelType: kIMKSingleColumnScrollingCandidatePanel)
        super.init(server: server, delegate: delegate, client: inputClient)
    }

    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        NSLog(
            "InputController handle \(state), \(event.keyCode), \(event.characters), \(candidates)"
        )

        guard let client = sender as? IMKTextInput else {
            return super.handle(event, client: sender)
        }

        switch event.keyCode {
        case Key.tab.rawValue:
            switch state {
            case .text:
                return super.handle(event, client: sender)

            case .context(let context):
                client.insertText(context, replacementRange: notFound)
                state = .text
                return true

            case .key(let context, let key):
                client.insertText(letterKey + key, replacementRange: notFound)
                state = .key(context, "")
                return true

            }

        case Key.left.rawValue,
            Key.right.rawValue,
            Key.down.rawValue,
            Key.up.rawValue,
            Key.return_.rawValue:
            switch state {
            case .text:
                return super.handle(event, client: sender)
            default:
                candidates.interpretKeyEvents([event])
                return true
            }
        default:
            break
        }

        // backslash
        if event.characters == "\\" {
            if case .text = state {
                state = .context("")
                return true
            } else if case .context("") = state {
                client.insertText("\\", replacementRange: notFound)
                state = .text
                return true
            }
        }

        switch (state, event.keyCode) {
        case (.text, Key.delete.rawValue):
            return super.handle(event, client: sender)

        // back
        case (_, Key.escape.rawValue),
            (.context(""), Key.delete.rawValue):
            state = .text

        case (.key(let context, ""), Key.delete.rawValue):
            state = .context(context)

        // delete
        case (.context(let context), Key.delete.rawValue):
            state = .context(String(context.dropLast()))

        case (.key(let context, let key), Key.delete.rawValue):
            state = .key(context, String(key.dropLast()))

        // input
        case (.text, _):
            client.insertText(event.characters, replacementRange: notFound)

        case (.context(let context), _):
            let contextNew = String(context + (event.characters ?? ""))
            state = .context(contextNew)

        case (.key(let context, let key), _):
            state = .key(context, key + (event.characters ?? ""))
        }

        return true
    }

    func toCandidate(_ key: String, _ word: String) -> String {
        return key + ": " + word
    }

    func fromCandidate(_ candidate: String) -> (String, String) {
        let keyWithWord = candidate.unicodeScalars.split(
            separator: ": ".unicodeScalars,
            omittingEmptySubsequences: false
        ).map { String($0) }

        return (keyWithWord[0], keyWithWord[1])
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
        let unsorted =
            dicts
            .compactMap {
                let ranges = $0.key.ranges(of: context)

                if context == "" || !ranges.isEmpty {
                    return (ranges.first!.lowerBound, $0.key, $0.value.0)
                } else {
                    return nil
                }
            }

        return
            unsorted
            .sorted(by: { (a, b) in
                (a.0, a.1.count, a.2) < (b.0, b.1.count, b.2)
            })
            .map { toCandidate($0.1, $0.2) }
    }

    func filterKeys(_ dict: [String: [String]], _ key: String) -> [String] {
        let unsorted =
            dict
            .flatMap {
                let (k, words) = $0
                let ranges = k.ranges(of: key)

                if key == "" || !ranges.isEmpty {
                    return words.map { (ranges.first!.lowerBound, k, $0) }
                } else {
                    return []
                }
            }

        let maybeSorted =
            unsorted.count < 4000
            ? unsorted.sorted(by: { (a, b) in
                (a.0, a.1.count, a.2) < (b.0, b.1.count, b.2)
            })
            : unsorted

        return maybeSorted.map { toCandidate($0.1, $0.2) }
    }

    override func candidateSelected(_ candidateString: NSAttributedString!) {
        switch state {
        case .text:
            fatalError("should not select in text mode")

        case .context(_):
            NSLog(candidateString.string)
            state = .key(
                fromCandidate(candidateString.string).0,
                "")

        case .key(let context, _):
            NSLog("\(candidateString.string.components(separatedBy: ": "))")
            self.client().insertText(
                fromCandidate(candidateString.string).1,
                replacementRange: notFound)
            state = .key(context, "")
        }
    }

    override func deactivateServer(_ sender: Any!) {
        NSLog("InputController deactivateServer")
        candidates.hide()
    }
}
