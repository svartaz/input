import Cocoa
import InputMethodKit

enum State {
    case initial
    case modeWait(String)
    case modeFix(String)
}

@objc(InputController)
class InputController: IMKInputController {
    var state = State.initial
    
    let keys = ["sumi", "toufu"]
    
    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        if
            let event = event,
            let client = sender as? IMKTextInput
        {
            switch(state) {
            case .initial:
                if event.characters == "\\" {
                    state = .modeWait("")
                    client.insertText("WAIT()", replacementRange: NSRange(location: NSNotFound, length: NSNotFound))
                    return true
                }
                else {
                    client.insertText(event.characters, replacementRange: NSRange(location: NSNotFound, length: NSNotFound))
                    return true
                }
                
            case .modeWait(let key):
                if event.characters == "\\" {
                    client.insertText("\\", replacementRange: NSRange(location: NSNotFound, length: NSNotFound))
                    state = .initial
                    client.insertText("INIT", replacementRange: NSRange(location: NSNotFound, length: NSNotFound))
                    return true
                }
                else if event.keyCode == kVK_Return {
                    if keys.contains(key) {
                        // enter special mode with current key
                        state = .modeFix(key)
                        client.insertText("FIX(" + key + ")", replacementRange: NSRange(location: NSNotFound, length: NSNotFound))
                        return true
                    } else {
                        // cannot find key; output key as plain text and initialise
                        state = .initial
                        client.insertText("INIT", replacementRange: NSRange(location: NSNotFound, length: NSNotFound))
                        return true
                    }
                }
                else if let string = event.characters {
                    state = .modeWait(key + string)
                    client.insertText("WAIT(" + key + string + ")", replacementRange: NSRange(location: NSNotFound, length: NSNotFound))
                    return true
                }
                
            case .modeFix(let key):
                break
                return true
            }
        }
        
        NSLog("space.sumi.inputmethod.2025 IMKitInputController handle else")
        return super.handle(event, client: sender);
    }
}
