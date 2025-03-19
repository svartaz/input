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
