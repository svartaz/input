const { dictUnicodeRange } = require("./_utility");

const dict = {
  ...dictUnicodeRange(0x10c00, [
    "a",
    "A",
    "AE",
    "i",
    "I",
    "E",
    "o",
    "u",

    "U",
    "b",
    "B",
    "bj",
    "BJ",
    "c",
    "C",
    "cj",

    "CJ",
    "d",
    "D",
    "dj",
    "z",
    "Z",
    "j",
    "J",

    "jj",
    "JJ",
    "qj",
    "QJ",
    "uqj",
    "UQJ",
    "l",
    "L",

    "lj",
    "lt",
    "m",
    "n",
    "nj",
    "NJ",
    "nt",
    "NT",

    "nk",
    "NK",
    "y",
    "Y",
    "G",
    "g",
    "GJ*",
    "p",

    "upj",
    "ik",
    "k",
    "K",
    "q",
    "Q",
    "iq",
    "IQ",

    "oq",
    "OQ",
    "r",
    "R",
    "rj",
    "s",
    "sj",
    "ax",

    "X",
    "x",
    "X*",
    "t",
    "T",
    "tj",
    "TJ",
    "ot",

    "bax",
  ]),
};

require("fs").writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({
    name: "𐰀",
    dict,
  }),
);
