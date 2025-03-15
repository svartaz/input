import Foundation

let unicodes = [0..<0xD800, 0xE000..<0x10FFFF].joined()

private func fetchDict(_ name: String) -> Dictionary<String, Array<String>> {
    do {
        return try JSONDecoder().decode(
            Dictionary<String, Array<String>>.self,
            from: try Data(
                contentsOf: Bundle.main.url(forResource: "dicts.bundle/\(name)", withExtension: "json")!
            )
        )
    } catch {
        return [:]
    }
}

let dicts: Dictionary<String, (String, Dictionary<String, Array<String>>)> = [
    "u": (
        "unicode name",
        Dictionary(
            uniqueKeysWithValues: unicodes.map({
                (
                    UnicodeScalar($0)?.properties.nameAlias?.lowercased()
                    ?? UnicodeScalar($0)?.properties.name?.lowercased()
                    ?? String($0)
                    ,
                    [String(UnicodeScalar($0)!)]
                )
            })
        )
    ),
    "u10": (
        "unicode 10",
        Dictionary(
            uniqueKeysWithValues: unicodes.map({
                (
                    String(format: "%0\(String(unicodes.last! - 1).count)d", $0),
                    [String(UnicodeScalar($0)!)]
                )
            })
        )
    ),
    "u16": (
        "unicode 16",
        Dictionary(
            uniqueKeysWithValues: unicodes.map({
                (
                    String(format: "%0\(String(unicodes.last! - 1, radix: 16).count)x", $0),
                    [String(UnicodeScalar($0)!)]
                )
            })
        )
    ),
    "hrkt": (
        "hiragana + katakana",
        fetchDict("hrkt")
    ),
    "hanz": (
        "hanzi",
        fetchDict("hanz")
    ),
    "yue": (
        "cantonese",
        fetchDict("yue")
    ),

    "grek": (
        "greek",
        fetchDict("grek")
    ),
    
    "cyrl": (
        "cyrillic",
        fetchDict("cyrl")
    )
]
