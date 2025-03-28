import AppKit

typealias Dict = [String: [String]]

private class NameJson: Decodable {
    let name: String
}

private class DictJson: Decodable {
    let dict: Dict
}

private let jsonDecoder = JSONDecoder()

let names = [String: String](
    uniqueKeysWithValues:
        Bundle.main.urls(
            forResourcesWithExtension: "json",
            subdirectory: "dicts.bundle")!.map {
            (
                $0.deletingPathExtension().relativePath,
                (try? jsonDecoder.decode(
                    NameJson.self, from: Data(contentsOf: $0)
                ))?.name ?? ""
            )
        }
)

private var dicts = [String: Dict]()

func fetchDict(_ context: String) -> Dict {
    if let dict = dicts[context] {
        return dict
    } else if let (_, dict) = dictsDefined[context] {
        dicts[context] = dict.merging(
            dictAscii, uniquingKeysWith: { a, b in a })
    } else {
        let url = Bundle.main.url(
            forResource: "dicts.bundle/" + context, withExtension: "json")!

        let dictJson = try! jsonDecoder.decode(
            DictJson.self, from: Data(contentsOf: url)
        )

        dicts[context] = dictJson.dict.merging(
            dictAscii, uniquingKeysWith: { a, b in a })
    }

    return dicts[context]!
}

let dictAscii = [Dict.Key: Dict.Value](
    uniqueKeysWithValues: (UnicodeScalar("!").value...UnicodeScalar("~").value)
        .map {
            (String(UnicodeScalar($0)!), [String(UnicodeScalar($0)!)])
        })

let dictsDefined: [String: (String, Dict)] = {
    let unicodes = [0..<0xD800, 0xE000..<0x110000].joined()

    let dictUnicodes =
        [String: [String]](
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
        "u32": (
            "unicode 32",
            Dictionary(
                uniqueKeysWithValues: unicodes.map {
                    (
                        String(
                            format:
                                "%0\(String(unicodes.last! - 1, radix: 32).count)x",
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
    ]
}()

let namesDefined = dictsDefined.mapValues { $0.0 }
