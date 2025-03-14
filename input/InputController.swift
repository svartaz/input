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
    var state = State.text
    var candidates = IMKCandidates()
    
    let letterKey = "\\"
    
    
    override init!(server: IMKServer!, delegate: Any!, client inputClient: Any!) {
        candidates = IMKCandidates(server: server, panelType: kIMKSingleColumnScrollingCandidatePanel)
        super.init(server: server, delegate: delegate, client: inputClient)
    }
    
    
    func toText() {
        state = .text
        candidates.hide()
        candidates.update()
        self.client().setMarkedText("",
            selectionRange: notFonud,
            replacementRange: notFonud)
    }
    
    
    func toSelectDict(_ keyDict: String) {
        state = .selectDict(keyDict)
        
        self.client().setMarkedText(
            NSAttributedString(string: letterKey + keyDict, attributes: self.mark(
                forStyle: kTSMHiliteSelectedConvertedText,
                at: NSMakeRange(NSNotFound, 0)
            ) as? [NSAttributedString.Key: Any]),
            selectionRange: notFonud,
            replacementRange: notFonud)
        
        candidates.update()
        candidates.show()
    }
    
    
    func toSelect(_ keyDict: String, _ keyWord: String) {
        NSLog("InputController: toSelect: \(keyDict), \(keyWord)")
        state = .select(keyDict, keyWord)
                
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
    
    
    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        NSLog("InputController: \(state), \(event.keyCode), \(event.characters), \(candidates)")

        candidates.showAnnotation(NSAttributedString("showAnnotation"))
        
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
        
        // number for select
        if case .text = state {}
        else if  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].contains(event.characters) {
            candidates.interpretKeyEvents([event])
            return true
        }
        
        // backslash
        if (event.characters == "\\") {
            if case .text = state {
                toSelectDict("")
                return true
            }
            else if case .selectDict("") = state {
                client.insertText("\\", replacementRange: notFonud)
                toText()
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
            toText()
            
        case
            (.select(let keyDict, ""), Key.delete.rawValue),
            (.select(let keyDict, ""), Key.escape.rawValue)
            :
            toSelectDict(keyDict)
            
            // clear
        case (.selectDict(_), Key.escape.rawValue):
            toSelectDict("")
            
        case (.select(let keyDict, _), Key.escape.rawValue):
            toSelect(keyDict, "")
            
            // delete
        case (.selectDict(let keyDict), Key.delete.rawValue):
            toSelectDict(String(keyDict.dropLast()))
            
        case (.select(let keyDict, let keyWord), Key.delete.rawValue):
            toSelect(keyDict, String(keyWord.dropLast()))
            
            // input
        case (.text, _):
            client.insertText(event.characters, replacementRange: notFonud)
            
        case (.selectDict(let keyDict), _):
            let keyDictNew = String(keyDict + (event.characters ?? ""))
            toSelectDict(keyDictNew)
            
        case (.select(let keyDict, let keyWord), _):
            toSelect(keyDict, keyWord + (event.characters ?? ""))
        }
        
        return true
    }
    
    
    override func candidates(_ sender: Any!) -> [Any]! {
        if case .selectDict(let keyDict) = state {
            return dicts
                .filter({ (k, _) in
                    keyDict == "" || k.contains(keyDict) })
                .map({ (k, v) in
                    "\(k): \(v.0)"
                })
        }
        else if
            case .select(let keyDict, let keyWord) = state,
            let (_, dict) = dicts[keyDict]
        {
            return Array(
                dict
                    .filter({ (k, _) in
                        keyWord == "" || k.contains(keyWord) })
                    .map({ (k, words) in
                        words.map({ w in
                            "\(k): \(w)" }) })
                    .joined()
            )
        }

        return []
    }
    
    
    override func candidateSelected(_ candidateString: NSAttributedString!) {
        switch state {
        case .text:
            fatalError("should not select in text mode")
            
        case .selectDict(_):
            toSelect(
                String(candidateString.string.split(separator: ": ", omittingEmptySubsequences: false)[0]),
                "")
            
        case .select(_, _):
            self.client().insertText(
                String(candidateString.string.split(separator: ": ", omittingEmptySubsequences: false)[1]),
                replacementRange: notFonud)
            toText()
        }
    }
    
    override func deactivateServer(_ sender: Any!) {
        candidates.hide()
    }
}
