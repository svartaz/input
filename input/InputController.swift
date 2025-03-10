import Cocoa
import InputMethodKit

@objc(InputController)
class InputController: IMKInputController {
    override func inputText(_ string: String, client sender: Any) -> Bool {
        NSLog("////////////////////////////////////////////////////////////////")
        NSLog("// space.sumi.inputmethod.2025 IMKitInputController inputText //")
        NSLog("////////////////////////////////////////////////////////////////")

        if let client = sender as? IMKTextInput {
            NSLog("space.sumi.inputmethod.2025 IMKitInputController inputText true")
            client.insertText("!", replacementRange: NSRange(location: NSNotFound, length: NSNotFound))
            return true
        }
        
        NSLog("space.sumi.inputmethod.2025 IMKitInputController inputText false")
        return false
    }
}

