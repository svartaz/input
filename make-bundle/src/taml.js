const { abugida } = require("./utility");

const dict = abugida(
  {
    n$: "\u0b82",
    h$: "ஃ",

    "#a": "அ",
    "#A": "ஆ",
    "#i": "இ",
    "#I": "ஈ",
    "#u": "உ",
    "#U": "ஊ",
    "#e": "எ",
    "#E": "ஏ",
    "#ai": "ஐ",
    "#o": "ஒ",
    "#O": "ஓ",
    "#au": "ஔ",

    om: "ௐ",

    0: "௦",
    1: "௧",
    2: "௨",
    3: "௩",
    4: "௪",
    5: "௫",
    6: "௬",
    7: "௭",
    8: "௮",
    9: "௯",
    10: "௰",
    100: "௱",
    1000: "௲",

    day: "௳",
    month: "௴",
    year: "௵",
    debit: "௶",
    credit: "௷",
    "as above": "௸",
    rupee: "௹",
    number: "௺",
  },
  {
    q: "க",
    g: "ங",
    k: "ச",
    z: "ஜ",
    nj: "ஞ",
    tr: "ட",
    nr: "ண",
    t: "த",
    n: "ந",
    nn: "ன", // !
    p: "ப",
    m: "ம",
    j: "ய",
    r: "ர",
    R: "ற",
    l: "ல",
    lr: "ள",
    ll: "ழ", // !
    v: "வ",
    x: "ஶ",
    sr: "ஷ",
    s: "ஸ",
    h: "ஹ",
  },
  {
    A: "\u0bbe",
    i: "\u0bbF",
    I: "\u0bc0",
    u: "\u0bc1",
    U: "\u0bc2",
    e: "\u0bc6",
    E: "\u0bc7",
    ai: "\u0bc8",
    o: "\u0bca",
    O: "\u0bcb",
    au: "\u0bcc",
    "": "\u0bcd", // virama

    "au*": "\u0bd7",
  },
);

require("fs").writeFileSync(
  __filename.replace(/\/(?=[^\/]*$)/, "/../../SumiInput/dicts.bundle/") + "on",
  JSON.stringify({
    name: "தமிழ்",
    dict,
  }),
);
