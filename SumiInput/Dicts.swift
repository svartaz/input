import AppKit

typealias Dicts = [String: (String, [String: [String]])]

func fetchDicts() -> Dicts {
    let unicodes = [0..<0xD800, 0xE000..<0x10FFFF].joined()

    class DictNamed: Decodable {
        let name: String
        let dict: [String: [String]]
    }

    func fetch(_ context: String) -> Dicts.Value? {

        if let url = Bundle.main.url(
            forResource: "dicts.bundle/\(context)", withExtension: "json"),
            let dictNamed = try? JSONDecoder().decode(
                DictNamed.self,
                from: Data(contentsOf: url)
            )
        {
            NSLog("fetched \(context)")
            return (dictNamed.name, dictNamed.dict)
        } else {
            NSLog("failed fetching \(context)")
            return nil
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
            uniqueKeysWithValues: [
                "latn",  // 0000
                "grek",  // 0370
                "cyrl",  // 0400
                "armn",  // 0530
                "arab",  // 0600
                "deva",  // 0900
                //"tibt", // 0F00
                "hang",  // 1100
                "hanz",  // 4E00
                "ja",
                "cmn",
                "yue",
            ]
            .compactMap { context in
                fetch(context).map { (context, $0) }
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
}
