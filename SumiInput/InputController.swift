import InputMethodKit

let notFound = NSRange(location: NSNotFound, length: NSNotFound)

enum State {
    case text
    case context(String)
    case key(String, String)
}

private enum Key: UInt16 {
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
    let dicts = fetchDicts()

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
    let enterPartialMatch = "%"

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
        if case .context(let context) = state {
            return candidatesContexts(context)
        } else if case .key(let context, let key) = state,
            let (_, dict) = dicts[context]
        {
            return candidatesKey(dict, key)
        }

        return []
    }

    func candidatesContexts(_ context: String) -> [String] {
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

    func superkeysSorted(
        _ dict: [String: [String]],
        _ key: String,
        _ partial: Bool
    ) -> [(key: String, word: String)] {
        NSLog("superkeysSorted")

        // every key is superkey of empty key
        // but return nothing instead, since it's heavy otherwise
        if key == "" { return [] }

        if partial {
            // seek for and superkeys
            let superkeys =
                dict.compactMap {
                    if let index = $0.key.range(of: key)?.lowerBound {
                        return (key: $0.key, index: index)
                    } else {
                        return nil
                    }
                }

            let flattened = superkeys.flatMap { a in
                dict[a.key]!.map {
                    (key: a.key, index: a.index, word: $0)
                }
            }

            /* sort by
             * - earlier match
             * - shorter key (higher match rate)
             * - word
             */
            let sorted =
                flattened.count < 1000
                ? flattened.sorted {
                    ($0.index, $0.key.count, $0.word.count, $0.word) < (
                        $1.index, $1.key.count, $1.word.count, $1.word
                    )
                }
                : flattened.count < 10000
                    ? flattened
                        .filter { $0.index == $0.key.startIndex }
                        .sorted {
                            ($0.key.count, $0.word.count, $0.word) < (
                                $1.key.count, $1.word.count, $1.word
                            )
                        }
                    : flattened.count < 100000
                        ? flattened
                            .filter { $0.index == $0.key.startIndex }
                            .sorted {
                                ($0.key.count, $0.word.count) < (
                                    $1.key.count, $1.word.count
                                )
                            }
                        : flattened

            return sorted.map { ($0.key, $0.word) }
        } else {
            let superkeys =
                dict.compactMap {
                    $0.key.starts(with: key)
                        ? $0.key
                        : nil
                }

            let flattened = superkeys.flatMap { k in
                dict[k]!.map { (key: k, word: $0) }
            }

            let sorted =
                flattened.count < 10000
                ? flattened.sorted {
                    ($0.key.count, $0.word.count, $0.word) < (
                        $1.key.count, $1.word.count, $1.word
                    )
                }
                : flattened.count < 100000
                    ? flattened.sorted {
                        ($0.key.count, $0.word.count) < (
                            $1.key.count, $1.word.count
                        )
                    }
                    : flattened

            return sorted.map { ($0.key, $0.word) }
        }
    }

    func matchKeys(
        _ dict: [String: [String]],
        _ keyPrefixed: String
    ) -> [(key: String, word: String)] {
        NSLog("matchKeys")

        let partial = keyPrefixed.starts(with: enterPartialMatch)
        let key = keyPrefixed.replacing(
            try! Regex("^" + enterPartialMatch), with: "")

        if key == "" { return [] }

        let superkeys = superkeysSorted(dict, key, partial)
        if !superkeys.isEmpty { return superkeys }

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
        let (subkeysFirst, subkeyLast) =
            keyRemain == ""
            ? (
                Array(subkeys[0..<subkeys.count - 1]),
                subkeys.last!
            )
            : (
                subkeys,
                keyRemain
            )
        NSLog("subkeysFirst=\(subkeysFirst) subkeyLast=\(subkeyLast)")
        
        let supersubkeys = superkeysSorted(dict, subkeyLast, false)

        return supersubkeys.isEmpty
            ? [
                (
                    subkeysFirst.joined(separator: joinSubkeys),
                    subkeysFirst
                        .map { dict[$0]!.sorted().first! }
                        .joined(separator: "")
                )
            ]
            : supersubkeys.map {
                (
                    (subkeysFirst + [$0.key]).joined(separator: joinSubkeys),
                    (subkeysFirst.map { dict[$0]!.sorted().first! } + [$0.word])
                        .joined(separator: "")
                )
            }
    }

    func candidatesKey(_ dict: [String: [String]], _ key: String) -> [String] {
        return matchKeys(dict, key).map {
            $0.key.replacingOccurrences(of: " ", with: "␣") + joinKeyValue
                + $0.word
        }
    }

    override func candidateSelected(_ candidateString: NSAttributedString!) {
        switch state {
        case .text:
            fatalError("should not select in text mode")

        case .context(_):
            state = .key(
                fromCandidate(candidateString.string, joinKeyValue).0,
                "")

        case .key(let context, let key):
            let (keySelected, word) = fromCandidate(
                candidateString.string, joinKeyValue)
            self.client().insertText(
                word,
                replacementRange: notFound)

            state =
                key.count < keySelected.count
                ? .key(context, "")
                : .key(
                    context,
                    key.replacing(
                        keySelected.replacingOccurrences(
                            of: "^" + enterPartialMatch + "|" + joinSubkeys,
                            with: ""),
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

        return (
            keyWithWord[0].replacingOccurrences(of: "␣", with: " "),
            keyWithWord[1]
        )
    }

    override func deactivateServer(_ sender: Any!) {
        NSLog("InputController deactivateServer")
        candidates.hide()
    }
}
