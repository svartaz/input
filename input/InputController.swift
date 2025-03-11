import Cocoa
import InputMethodKit
import AppKit

enum State {
    case text
    case mode(String)
    case query(String, String)
}

let notFonud = NSRange(location: NSNotFound, length: NSNotFound)

@objc(InputController)
class InputController: IMKInputController {
    var state = State.text
    var candidates = IMKCandidates()

    override init!(server: IMKServer!, delegate: Any!, client inputClient: Any!) {
        candidates = IMKCandidates(server: server, panelType: kIMKSingleColumnScrollingCandidatePanel)

        super.init(server: server, delegate: delegate, client: inputClient)
    }

    override func handle(_ event: NSEvent!, client sender: Any!) -> Bool {
        NSLog("IMKInputController handle: \(event.type), \(event.keyCode), \(event.characters)")
        
        if
            let event = event,
            event.type == .keyDown,
            ![
                51,  // delete
                48,  // tab
                123, // left
                124, // right
                125, // down
                126  // up
            ].contains(event.keyCode),
            let client = sender as? IMKTextInput,
            let string = event.characters
        {
            switch state {
            case .text:
                switch string {
                case "\\":
                    state = .mode("")
                    client.insertText("()", replacementRange: notFonud)
                    return true
                
                case "\n", "\r", "\r\n":
                    client.insertText("\n", replacementRange: notFonud)
               
                default:
                    client.insertText(string, replacementRange: notFonud)
                    return true
                }
            case .mode(let k):
                switch string {
                case "\\":
                    client.insertText("\\", replacementRange: notFonud)
                    state = .text
                    client.insertText("^", replacementRange: notFonud)
                    return true

                case "\n", "\r", "\r\n":
                    if dict.keys.contains(k) {
                        state = .query(k, "")
                        client.insertText("[\(k),]", replacementRange: notFonud)
                        return true

                    } else {
                        client.insertText(k, replacementRange: notFonud)
                        state = .text
                        client.insertText("^", replacementRange: notFonud)
                        return true
                    }
                default:
                    state = .mode(k + string)
                    client.insertText("(\(k + string))", replacementRange: notFonud)
                    return true
                }
            case .query(let k, let q):
                switch string {
                case "\n", "\r", "\r\n":
                    // choose
                    state = .text
                    client.insertText("^", replacementRange: notFonud)
                    return true
                default:
                    state = .query(k, q + string)
                    client.insertText("[\(k),\(q + string)]", replacementRange: notFonud)
                    return true
                }
            }
        }
        
        return super.handle(event, client: sender);
    }
}
