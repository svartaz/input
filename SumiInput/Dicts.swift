import AppKit

typealias Dicts = [String: (String, [String: [String]])]

let dicts: Dicts = {
    let unicodes = [0..<0xD800, 0xE000..<0x10FFFF].joined()

    class DictNamed: Decodable {
        let name: String
        let dict: [String: [String]]
    }

    func fetchBundle() -> [(Dicts.Key, Dicts.Value)] {
        guard
            let urls = Bundle.main.urls(
                forResourcesWithExtension: "json", subdirectory: "dicts.bundle")
        else {
            return []
        }
        return urls.compactMap {
            let context = $0.deletingPathExtension().relativePath

            if let dictNamed = try? JSONDecoder().decode(
                DictNamed.self, from: Data(contentsOf: $0))
            {
                NSLog("fetched \(context)")
                return (context, (dictNamed.name, dictNamed.dict))
            } else {
                NSLog("failed fetching \(context)")
                return nil
            }
        }
    }

    let dictUnicodes: [String: [String]] =
        Dictionary(
            uniqueKeysWithValues:
                unicodes.compactMap {
                    UnicodeScalar($0).flatMap { us in
                        (us.properties.nameAlias ?? us.properties.name).map {
                            name in
                            (
                                name.lowercased(),
                                [String(us)]
                            )
                        }
                    }
                }
        )

    let dictsFetched: Dicts =
        Dictionary(
            uniqueKeysWithValues: fetchBundle()
        )

    return [
        "u": (
            "unicode name",
            dictUnicodes
        ),
        "u10": (
            "unicode 10",
            Dictionary(
                uniqueKeysWithValues: unicodes.map {
                    (
                        String(
                            format:
                                "%0\(String(unicodes.last! - 1).count)d", $0
                        ),
                        [String(UnicodeScalar($0)!)]
                    )
                }
            )
        ),
        "u16": (
            "unicode 16",
            Dictionary(
                uniqueKeysWithValues: unicodes.map {
                    (
                        String(
                            format:
                                "%0\(String(unicodes.last! - 1, radix: 16).count)x",
                            $0),
                        [String(UnicodeScalar($0)!)]
                    )
                }
            )
        ),
        "emoji": (
            "😀",
            Dictionary(
                uniqueKeysWithValues: unicodes.compactMap { unicode in
                    if let us = UnicodeScalar(unicode),
                        us.properties.isEmoji
                    {
                        return (
                            (us.properties.nameAlias ?? us.properties.name
                                ?? String(unicode, radix: 16)).lowercased(),
                            [String(us)]
                        )
                    } else {
                        return nil
                    }
                }
            )
        ),
    ].merging(dictsFetched, uniquingKeysWith: { it, _ in it })
}()
