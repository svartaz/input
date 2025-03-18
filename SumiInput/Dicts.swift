import Foundation

typealias Dicts = [String: (String, [String: [String]])]

let dicts: Dicts = {
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
                        (us.properties.nameAlias ?? us.properties.name).map
                        {
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
                "latn",
                "grek",
                "cyrl",
                "arab",
                "deva",
                "hang",
                "hrkt",
                "hanz",
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
                uniqueKeysWithValues: unicodes.map({
                    (
                        String(
                            format:
                                "%0\(String(unicodes.last! - 1).count)d", $0
                        ),
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
                        String(
                            format:
                                "%0\(String(unicodes.last! - 1, radix: 16).count)x",
                            $0),
                        [String(UnicodeScalar($0)!)]
                    )
                })
            )
        ),
    ].merging(dictsFetched, uniquingKeysWith: { it, _ in it })
}()
