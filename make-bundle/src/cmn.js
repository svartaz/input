const fs = require("fs");
const {
  replaceEach,
  pushUniquelyToValue,
  scToTcs,
  常用國字標準字體表,
  次常用國字標準字體表,
} = require("./_utility.js");

const inTaiwanStandard = (hanz) =>
  (常用國字標準字體表 + 次常用國字標準字體表).includes(hanz);

const pinyinToLatn = (pinyin) => {
  /*
    b p  f m
    d t    n
    z ts s l
    j tx x r
    c k  h g
    i u y
    e a
  */

  let latn = pinyin.toLowerCase().normalize("NFKD");

  const tone = /\u0304|1$/.test(latn)
    ? 0
    : /\u0301|2$/.test(latn)
      ? 1
      : /\u030C|3$/.test(latn)
        ? 2
        : /\u0300|4$/.test(latn)
          ? 3
          : 4;

  return replaceEach(latn, [
    [/[\u0304\u0301\u030C\u0300]|[1-5]$/, ""],
    [/.+/, (it) => it.normalize("NFKC")],

    [/(?<=[jqx])u/, "ü"],
    [/(?<=[bpmf])o/, "uo"],

    [/^j/, "g"],
    [/^q/, "k"],
    [/^x/, "h"],

    [/^yu/, "ü"],
    [/^yi/, "i"],
    [/^y/, "i"],
    [/^wu/, "u"],
    [/^w/, "u"],

    [/ao/, "au"],
    [/iong/, "üng"],
    [/ong/, "ung"],
    [/o/, "e"],

    [/^zh/, "j"],
    [/^ch/, "tx"],
    [/^sh/, "x"],

    [/^c/, "ts"],
    [/^g/, "c"],
    [/ng$/, "g"],

    [/ü/, "y"],

    [/(?<=[iuy])e(?=.)/, ""],
    [/(?<=[^iuy])e(?=[gn])/, ""],
    [/(?<=^(z|t?s|j|t?x|r))i$/, ""],

    [/$/, ["/", "<", "\\", ">", "*"][tone]],
  ]);
};

const dict = {};

// single character
for (const line of fs
  .readFileSync(__dirname + "/../../submodules/pinyin-data/kMandarin.txt")
  .toString()
  .trim()
  .split("\n")) {
  const row = line.replace(/ *#.+$/, "").split(": ");

  const hanz = String.fromCharCode(parseInt(row[0].replace("U+", "0x")));
  if (!/^\p{sc=Han}$/u.test(hanz)) continue;
  if (!inTaiwanStandard(hanz)) continue;

  for (const latnOld of row[1].split(" ")) {
    const key = pinyinToLatn(latnOld);

    for (const h of hanz in scToTcs ? scToTcs[hanz] : [hanz])
      pushUniquelyToValue(dict, key, hanz);
  }
}

// words
for (const line of fs
  // https://www.mdbg.net/chinese/dictionary?page=cedict
  .readFileSync(process.env.HOME + "/Downloads/cedict_ts.u8")
  .toString()
  .trim()
  .split("\n")) {
  const word = line.match(/^\p{sc=Han}+(?= )/u)?.[0];
  if (!word) continue;

  let key = line.match(/(?<=\[).+?(?=\])/)[0];
  if (key === "xx5") continue;

  key = key
    .replace(/ - /g, " ")
    .replace(/u:/g, "ü")
    .split(/ +/g)
    .map(pinyinToLatn)
    // delete tone in poly-syllable word
    .map((it, _, self) => (2 <= self.length ? it.replace(/[/<\\>*]$/, "") : it))
    .join(" ");

  pushUniquelyToValue(dict, key, word);
}

fs.writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({ name: "華", dict }),
);
