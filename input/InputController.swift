import Cocoa
import InputMethodKit
import AppKit

let notFonud = NSRange(location: NSNotFound, length: NSNotFound)


enum State {
    case text
    case selectDict(String)
    case select(String, String)
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
            NSLog("InputController: didSet")
            
            switch state {
            case .text:
                candidates.hide()
                candidates.update()
                self.client().setMarkedText("",
                    selectionRange: notFonud,
                    replacementRange: notFonud)

            case .selectDict(let keyDict):
                NSLog("InputController: didSet .selectDict(\(keyDict))")

                self.client().setMarkedText(
                    NSAttributedString(string: letterKey + keyDict, attributes: self.mark(
                        forStyle: kTSMHiliteSelectedConvertedText,
                        at: NSMakeRange(NSNotFound, 0)
                    ) as? [NSAttributedString.Key: Any]),
                    selectionRange: notFonud,
                    replacementRange: notFonud)
                
                candidates.update()
                candidates.show()
          
            case .select(let keyDict, let keyWord):
                NSLog("InputController: toSelect(\(keyDict), \(keyWord))")
                
                let nameDict = dicts[keyDict]!.0
                
                self.client().setMarkedText(
                    NSAttributedString(string: "[\(nameDict)]\(keyWord)", attributes: self.mark(
                        forStyle: kTSMHiliteSelectedConvertedText,
                        at: NSMakeRange(NSNotFound, 0)
                    ) as? [NSAttributedString.Key: Any]),
                    selectionRange: notFonud,
                    replacementRange: notFonud)
                
                candidates.update()
                candidates.show()
            }
        }
    }

    let letterKey = "\\"

    override init!(server: IMKServer!, delegate: Any!, client inputClient: Any!) {
        NSLog("InputController: init!")
        state = .text
        candidates = IMKCandidates(server: server, panelType: kIMKSingleColumnScrollingCandidatePanel)
        super.init(server: server, delegate: delegate, client: inputClient)
    }
    
    
    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        NSLog("InputController: handle \(state), \(event.keyCode), \(event.characters), \(candidates)")

        guard let client = sender as? IMKTextInput else {
            return super.handle(event, client: sender);
        }
        
        // special keys
        if [
            Key.tab.rawValue,
            Key.left.rawValue,
            Key.right.rawValue,
            Key.down.rawValue,
            Key.up.rawValue,
            Key.return_.rawValue,
        ].contains(event.keyCode) {
            switch state {
            case .text:
                return super.handle(event, client: sender)
            default:
                candidates.interpretKeyEvents([event])
                return true
            }
        }
        
        // backslash
        if (event.characters == "\\") {
            if case .text = state {
                state = .selectDict("")
                return true
            }
            else if case .selectDict("") = state {
                client.insertText("\\", replacementRange: notFonud)
                state = .text
                return true
            }
        }
        
        switch (state, event.keyCode) {
        case (.text, Key.delete.rawValue):
            return super.handle(event, client: sender)
            
            // back
        case
            (.selectDict(""), Key.delete.rawValue),
            (.selectDict(""), Key.escape.rawValue)
            :
            state = .text
            
        case
            (.select(let keyDict, ""), Key.delete.rawValue),
            (.select(let keyDict, ""), Key.escape.rawValue)
            :
            state = .selectDict(keyDict)
            
            // clear
        case (.selectDict(_), Key.escape.rawValue):
            state = .selectDict("")
            
        case (.select(let keyDict, _), Key.escape.rawValue):
            state = .select(keyDict, "")
            
            // delete
        case (.selectDict(let keyDict), Key.delete.rawValue):
            state = .selectDict(String(keyDict.dropLast()))
            
        case (.select(let keyDict, let keyWord), Key.delete.rawValue):
            state = .select(keyDict, String(keyWord.dropLast()))
            
            // input
        case (.text, _):
            client.insertText(event.characters, replacementRange: notFonud)
            
        case (.selectDict(let keyDict), _):
            let keyDictNew = String(keyDict + (event.characters ?? ""))
            state = .selectDict(keyDictNew)
            
        case (.select(let keyDict, let keyWord), _):
            state = .select(keyDict, keyWord + (event.characters ?? ""))
        }
        
        return true
    }
    
    
    override func candidates(_ sender: Any!) -> [Any]! {
        NSLog("InputController: candidates")
        
        if case .selectDict(let keyDict) = state {
            return Array<String>(dicts
                .lazy
                .filter {
                    keyDict == "" || $0.key.contains(keyDict) }
                .sorted(by: {
                    ($0.key.ranges(of: keyDict).startIndex, $0.key.count, $0.value.0) <
                    ($1.key.ranges(of: keyDict).startIndex, $1.key.count, $1.value.0) })
                .map {
                    "\($0.key): \($0.value.0)" }
            )
        }
        else if
            case .select(let keyDict, let keyWord) = state,
            let (_, dict) = dicts[keyDict]
        {
            return Array<String>(
                dict
                    .lazy
                    .filter {
                        keyWord == "" || $0.key.contains(keyWord) }
                    .flatMap { (k: String, words: Array<String>) in
                        words.map { (k, $0) }
                    }
                    .sorted(by: {
                        ($0.0.ranges(of: keyDict).startIndex, $0.0.count, $0.1) <
                        ($1.0.ranges(of: keyDict).startIndex, $1.0.count, $1.1) })
                    .map { "\($0.0): \($0.1)" }
            )
        }

        return []
    }
    
    
    override func candidateSelected(_ candidateString: NSAttributedString!) {
        NSLog("InputController: candidateSelected(\(candidateString))")

        switch state {
        case .text:
            fatalError("should not select in text mode")
            
        case .selectDict(_):
            state = .select(
                String(candidateString.string.split(separator: ": ", omittingEmptySubsequences: false)[0]),
                "")
            
        case .select(let keyDict, _):
            self.client().insertText(
                String(candidateString.string.split(separator: ": ", omittingEmptySubsequences: false)[1]),
                replacementRange: notFonud)
            state = .select(keyDict, "")
        }
    }
    
    override func deactivateServer(_ sender: Any!) {
        NSLog("InputController: deactivateServer")
        candidates.hide()
    }
}
