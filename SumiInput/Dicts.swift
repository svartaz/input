import Foundation

let unicodes = [0..<0xD800, 0xE000..<0x10FFFF].joined()

private func fetchDict(_ name: String) -> Dictionary<String, [String]> {
    do {
        return try JSONDecoder().decode(
            Dictionary<String, [String]>.self,
            from: try Data(
                contentsOf: Bundle.main.url(forResource: "dicts.bundle/\(name)", withExtension: "json")!
            )
        )
    } catch {
        return [:]
    }
}

let dicts: Dictionary<String, (String, Dictionary<String, [String]>)> = [
    "u": (
        "unicode name",
        Dictionary(
            uniqueKeysWithValues: unicodes.flatMap {
                if let name =
                    UnicodeScalar($0)?.properties.nameAlias
                    ?? UnicodeScalar($0)?.properties.name
                {
                    return [(
                        name.lowercased()
                        ,
                        [String(UnicodeScalar($0)!)]
                    )]

                }
                else {
                    return []
                }
            }
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
    "grek": (
        "greek",
        fetchDict("grek")
    ),
    
    "cyrl": (
        "cyrillic",
        fetchDict("cyrl")
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
    "hang": (
        "hangul",
        fetchDict("hang")
    ),
]
