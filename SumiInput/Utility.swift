func monospace(_ s: String, _ undo: Bool = false) -> String {
    let temp = (0..<26)
        .reduce(
            s,
            { (result: String, i: Int) in
                result
                    .replacingOccurrences(
                        of: String(
                            UnicodeScalar(
                                UnicodeScalar(undo ? "𝙰" : "A").value
                                    + UInt32(i))!),
                        with: String(
                            UnicodeScalar(
                                UnicodeScalar(undo ? "A" : "𝙰").value
                                    + UInt32(i))!)
                    )
                    .replacingOccurrences(
                        of: String(
                            UnicodeScalar(
                                UnicodeScalar(undo ? "𝚊" : "a").value
                                    + UInt32(i))!),
                        with: String(
                            UnicodeScalar(
                                UnicodeScalar(undo ? "a" : "𝚊").value
                                    + UInt32(i))!)
                    )
            })

    return (0..<10).reduce(
        temp,
        { (result: String, i: Int) in
            result
                .replacingOccurrences(
                    of: String(
                        UnicodeScalar(
                            UnicodeScalar(undo ? "𝟶" : "0").value
                                + UInt32(i))!),
                    with: String(
                        UnicodeScalar(
                            UnicodeScalar(undo ? "0" : "𝟶").value
                                + UInt32(i))!)
                )
        })
}
