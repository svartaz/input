const fs = require("fs");

exports.range = (from, until) =>
  Array.from({ length: until - from }, (_, i) => from + i);

exports.toStringWithRadix = (radix, n) => {
  const digits =
    radix < 37
      ? "0123456789abcdefghijklmnopqrstuvwxyz"
      : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz&@";

  if (n === 0) return digits[0];

  const recurse = (quotinent, remainders) =>
    quotinent === 0
      ? remainders
      : recurse(Math.floor(quotinent / radix), [
          quotinent % radix,
          ...remainders,
        ]);

  return recurse(n, [])
    .map((i) => digits[i])
    .join("");
};
console.assert(this.toStringWithRadix(64, 255) === "3@");

exports.padLeft = (string, padder, length) =>
  (padder.repeat(length) + string).slice(-length);
console.assert(this.padLeft("64", "0", 4) === "0064");

exports.capitalise = (s) => s.slice(0, 1).toUpperCase() + s.slice(1);
console.assert(this.capitalise("capital") === "Capital");

exports.replaceEach = (s, replacements) =>
  replacements.reduce((acc, replacement) => acc.replace(...replacement), s);

exports.dictUnicodeRange = (begin, keys) =>
  Object.fromEntries(
    keys
      .map((key, i) => [key, [String.fromCharCode(begin + i)]])
      .filter(([k]) => k !== null),
  );

exports.valueToSingleton = (o) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, [v]]));

exports.pushUniquelyToValue = (object, key, value) => {
  if (key in object)
    if (object[key].includes(value)) 0;
    else object[key].push(value);
  else object[key] = [value];
};

exports.abugida = (isolates, consonants, vowels) => {
  const dict = {};

  for (const k in isolates) dict[k] = [isolates[k]];

  for (const [kC, c] of Object.entries(consonants)) {
    this.pushUniquelyToValue(dict, kC + "a", c);

    for (const [kV, v] of Object.entries(vowels))
      this.pushUniquelyToValue(dict, kC + kV, c + v);
  }

  for (const k in vowels) this.pushUniquelyToValue(dict, "-" + k, vowels[k]);

  return dict;
};

exports.scToTcs = Object.fromEntries(
  fs
    .readFileSync(
      __dirname + "/../../submodules/unihan-database/kTraditionalVariant.txt",
    )
    .toString()
    .trim()
    .split("\n")
    .map((line) => {
      const row = line.split("\t");
      const sc = row[0].split(" ")[1];
      const tcs = row[row.length - 1]
        .split(" ")
        .map((u) => String.fromCharCode(Number(u.replace("U+", "0x"))))
        .filter((it) => it != sc);
      return [sc, tcs];
    }),
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
    ([from, until]) => from <= code && code < until,
  );
};

exports.hanzToLatns = (() => {
  const o = {};
  fs.readFileSync(__dirname + "/../../submodules/Zyevio/隋語廣韻全字表.csv")
    .toString()
    .trim()
    .split("\n")
    .slice(1)
    .forEach((line) => {
      const row = line.split(",");
      const hanz = row[1];
      const tone = "平上去入".indexOf(row[10]);
      const latn = exports.replaceEach(row[2], [
        [/.+/, (it) => it.normalize("NFKD")],
        [/[\u0301\u0302]/, ""],

        [/^j(?=[iy])/, ""],
        [/ʼ/, "'"],
        [/ьʼ/, "j'"],

        [/^x/, "h"],
        [/^qh/, "x"],

        [/^c/, "ts"], // ț
        [/^dz/, "dz"], // d̦

        [/^g/, "c"],
        [/ŋ/g, "g"],

        [/^sh/, "ss"], // š
        [/^zh/, "zz"], // ž

        [/^kh/, "kx"], // ꝁ
        [/^th/, "tx"], // ŧ
        [/^tsh/, "tsx"], // ṯ
        [/^ph/, "px"], // ꝑ

        [/ə/, "v"],

        [/$/, ["", "q", "s", ""][tone]],
        [/.+/, (it) => it.normalize("NFKC")],
      ]);

      if (hanz in o) {
        if (!o[hanz].includes(latn)) o[hanz].push(latn);
      } else o[hanz] = [latn];
    });

  return o;
})();

// https://zh.wikisource.org/wiki/%E5%B8%B8%E7%94%A8%E5%9C%8B%E5%AD%97%E6%A8%99%E6%BA%96%E5%AD%97%E9%AB%94%E8%A1%A8
exports.常用國字標準字體表 = fs.readFileSync(
  __dirname + "/../resource/常用國字標準字體表.txt",
);

// https://zh.wikisource.org/wiki/%E6%AC%A1%E5%B8%B8%E7%94%A8%E5%9C%8B%E5%AD%97%E6%A8%99%E6%BA%96%E5%AD%97%E9%AB%94%E8%A1%A8
exports.次常用國字標準字體表 = fs.readFileSync(
  __dirname + "/../resource/次常用國字標準字體表.txt",
);

exports.香港增補字符集 = fs.readFileSync(
  __dirname + "/../resource/香港增補字符集.txt",
);

exports.常用漢字表 = fs.readFileSync(__dirname + "/../resource/常用漢字表.txt");
