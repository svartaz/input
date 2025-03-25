const { valueToSingleton, abugida } = require("./utility");

const dict = abugida(
  {
    " ": " ",

    "~": "\u0b01",
    n$: "\u0b02",
    h$: "\u0b03",
    "|": "\u0b55",

    "#a": "ଅ",
    "#aa": "ଆ",
    "#i": "ଇ",
    "#ii": "ଈ",
    "#u": "ଉ",
    "#uu": "ଊ",
    "#r": "ଋ",
    "#l": "ଌ",
    "#ll": "ୡ",
    "#e": "ଏ",
    "#ai": "ଐ",
    "#o": "ଓ",
    "#au": "ଔ",

    "*": "\u0b3c", // nuqta
    "'": "ଽ", // avagraha

    "#rr": "ୠ",
    "#ll": "ୡ",

    0: "୦",
    1: "୧",
    2: "୨",
    3: "୩",
    4: "୪",
    5: "୫",
    6: "୬",
    7: "୭",
    8: "୮",
    9: "୯",

    "@": "୰",
    "/4": "୲",
    "/2": "୳",
    "3/4": "୴",
    "/16": "୵",
    "/8": "୶",
    "3/16": "୷",
    "3/16": "୷",
  },
  {
    q: "କ",
    qh: "ଖ",
    c: "ଗ",
    ch: "ଘ",
    g: "ଙ",

    k: "ଚ",
    kh: "ଛ",
    z: "ଜ",
    zh: "ଝ",
    nj: "ଞ",

    tr: "ଟ",
    trh: "ଠ",
    dr: "ଡ",
    drh: "ଢ",
    nr: "ଣ",

    rd: "ଡ଼",
    rdh: "ଢ଼",

    t: "ତ",
    th: "ଥ",
    d: "ଦ",
    dh: "ଧ",
    n: "ନ",

    p: "ପ",
    ph: "ଫ",
    b: "ବ",
    bh: "ଭ",
    m: "ମ",

    j: "ଯ",
    r: "ର",
    l: "ଲ",
    lr: "ଳ",
    v: "ଵ",
    x: "ଶ",
    sr: "ଷ",
    s: "ସ",
    h: "ହ",

    "dr*": "ଡ଼",
    "drh*": "ଢ଼",
    "j*": "ୟ",

    v: "ୱ",
  },
  {
    aa: "\u0b3E",
    i: "\u0b3F",
    ii: "\u0b40",
    u: "\u0b41",
    uu: "\u0b42",
    r: "\u0b43",
    rr: "\u0b44",
    ai: "\u0b47",
    aai: "\u0b48",
    au: "\u0b4B",
    aau: "\u0b4C",
    "": "\u0b4D", // virama

    l: "\u0b62",
    ll: "\u0b63",

    "ai*": "\u0b56",
    "au*": "\u0b57",
  },
);

require("fs").writeFileSync(
  __dirname + `/../../SumiInput/dicts.bundle/orya.json`,
  JSON.stringify(
    {
      name: "ଓଡ଼ିଆ",
      dict,
    },
    null,
    2,
  ),
);
