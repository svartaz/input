const fs = require("fs");

exports.replaceEach = (s, replacements) =>
  replacements.reduce((acc, replacement) => acc.replace(...replacement), s);

exports.valueToSingleton = (o) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, [v]]));

exports.scToTcs = Object.fromEntries(
  fs
    .readFileSync(
      __dirname + "/../../submodules/unihan-database/kTraditionalVariant.txt"
    )
    .toString()
    .trim()
    .split("\n")
    .map((line) => {
      const row = line.split("\t");
      const sc = row[0].split(" ")[1];
      const tcs = row[row.length - 1]
        .split(" ")
        .map((u) => String.fromCharCode(Number(u.replace("U+", "0x"))));
      return [sc, tcs];
    })
);

exports.rangesCodeHanz = [
  // CJK Unified Ideographs
  [0x4e00, 0xa000],

  // CJK Unified Ideographs Extension A
  [0x3400, 0x4dbf],

  // CJK Unified Ideographs Extension B
  //[0x20000, 0x2a6e0],
];

exports.hanzInRange = (hanzOrCode) => {
  const code =
    typeof hanzOrCode === "string" ? hanzOrCode.codePointAt(0) : hanzOrCode;

  return this.rangesCodeHanz.some(
    ([from, until]) => from <= code && code < until
  );
};
