import Cocoa
import InputMethodKit

class NSManualApplication: NSApplication {
    private let appDelegate = AppDelegate()

    override init() {
        NSLog("space.sumi.inputmethod.2025 NSManualApplication init")
        
        super.init()
        self.delegate = appDelegate
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) not implemented")
    }
}

@main
class AppDelegate: NSObject, NSApplicationDelegate {
    var server = IMKServer()
    var candidates = IMKCandidates()

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSLog("space.sumi.inputmethod.2025 AppDelegate applicationDidFinishLaunching")
        
        server = IMKServer(name: Bundle.main.infoDictionary?["InputMethodConnectionName"] as? String, bundleIdentifier: Bundle.main.bundleIdentifier)
        candidates = IMKCandidates(server: server, panelType: kIMKScrollingGridCandidatePanel, styleType: kIMKMain)
        NSLog("tried connection")
    }
}

