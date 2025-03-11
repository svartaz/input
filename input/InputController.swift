import Cocoa
import InputMethodKit

enum State {
    case text
    case mode(String)
    case query(String, String)
}

@objc(InputController)
class InputController: IMKInputController {
    var state = State.text
    var candidates = IMKCandidates()
    
    override init!(server: IMKServer!, delegate: Any!, client inputClient: Any!) {
        candidates = IMKCandidates(server: server, panelType: kIMKSingleColumnScrollingCandidatePanel)
        
        super.init(server: server, delegate: delegate, client: inputClient)
    }
    
    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        let here = NSRange(location: NSNotFound, length: NSNotFound)
        
        if
            let event = event,
            let client = sender as? IMKTextInput
        {
            NSLog("IMKInputController handle: " + (event.characters ?? "nil"))
            
            switch(state) {
            case .text:
                if event.characters == "\\" {
                    state = .mode("")
                    client.insertText("()", replacementRange: here)
                    return true
                }
                else if let text = event.characters {
                    client.insertText(text, replacementRange: here)
                    return true
                }
                
            case .mode(let key):
                // backslash twice: put backslash and initialise
                if event.characters == "\\" {
                    client.insertText("\\", replacementRange: here)
                    state = .text
                    client.insertText("^", replacementRange: here)
                    return true
                }
                // return pressed
                else if event.keyCode == kVK_Return {
                    // set current key as mode
                    if dict.keys.contains(key) {
                        state = .query(key, "")
                        client.insertText("[" + key + "]", replacementRange: here)
                        return true
                    }
                    // cannot find key: output key as plain text and initialise
                    else {
                        client.insertText(key, replacementRange: here)
                        state = .text
                        client.insertText("^", replacementRange: here)
                        return true
                    }
                }
                else if let string = event.characters {
                    state = .mode(key + string)
                    client.insertText("(" + key + string + ")", replacementRange: here)
                    return true
                }
                
            case .query(let key, let buffer):
                if event.keyCode == kVK_Return {
                    candidates.hide()
                    
                    state = .text
                    client.insertText("^", replacementRange: here)
                    
                    return true
                }
                else if let text = event.characters {
                    candidates.show()
                    candidates.setCandidateData(["a", "b", "c"])
                    //candidates.interpretKeyEvents([event])

                    client.insertText(text, replacementRange: here)
                    return true
                }
            }
        }
        
        return super.handle(event, client: sender);
    }
}
