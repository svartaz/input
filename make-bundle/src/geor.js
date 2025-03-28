const { dictUnicodeRange } = require("./_utility");

const dict = {
  ...dictUnicodeRange(0x10a0, [
    "A",
    "B",
    "C",
    "D",
    "E",
    "V",
    "Z",
    "T",

    "I",
    "KK",
    "L",
    "M",
    "N",
    "O",
    "PP",
    "ZJ",

    "R",
    "S",
    "TT",
    "U",
    "P",
    "K",
    "G",
    "QQ",

    "SJ",
    "TJ",
    "TS",
    "DZ",
    "TTS",
    "TTJ",
    "X",
    "DJ",

    "H",
    "EI",
    "J",
    "UI",
    "Q",
    "OO",
    null,
    "W",

    null,
    null,
    null,
    null,
    null,
    "Y",
    null,
    null,

    "a",
    "b",
    "c",
    "d",
    "e",
    "v",
    "z",
    "t",

    "i",
    "kk",
    "l",
    "m",
    "n",
    "o",
    "pp",
    "zj",

    "r",
    "s",
    "tt",
    "u",
    "p",
    "k",
    "ch",
    "qq",

    "sj",
    "tj",
    "ts",
    "dz",
    "tts",
    "ttj",
    "x",
    "dj",

    "h",
    "ei",
    "j",
    "w",
    "q",
    "ɦ",
    "f",
    "w",

    "%",
    "ch",
    "#",
    "PARAGRAPH",
    "^n",
    "y",
    "^c",
    "^b",
  ]),
};

require("fs").writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({
    name: "ქართული",
    dict,
  }),
);
