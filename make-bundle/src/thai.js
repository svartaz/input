// FIXME

const { abugida } = require("./_utility");

const dict = abugida(
  {
    "#r": "ฤ",
    "#l": "ฦ",

    "&": "ฯ",
    baht: "฿",

    0: "੦",
    1: "੧",
    2: "੨",
    3: "੩",
    4: "੪",
    5: "੫",
    6: "੬",
    7: "੭",
    8: "੮",
    9: "੯",
  },
  {
    q: "ก",
    qh: "ข",
    "qh*": "ฃ",
    c: "ค",
    "c*": "ฅ",
    ch: "ฆ",
    g: "ง",

    k: "จ",
    kh: "ฉ",
    z: "ช",
    "z*": "ซ",
    zh: "ฌ",
    nj: "ญ",

    tr: "ฎ",
    "tr*": "ฏ",
    trh: "ฐ",
    dr: "ฑ",
    drh: "ฒ",
    nr: "ณ",

    t: "ด",
    "t*": "ต",
    th: "ถ",
    d: "ท",
    dh: "ธ",
    n: "น",

    p: "บ",
    "p*": "ป",
    ph: "ผ",
    f: "ฝ",
    b: "พ",
    v: "ฟ",
    bh: "ภ",
    m: "ม",

    j: "ย",
    r: "ร",
    l: "ล",
    w: "ว",

    x: "ศ",
    sr: "ษ",
    s: "ส",
    h: "ห",
    lr: "ฬ",
    "": "อ",
    "h*": "ฮ",

    //ๅ
  },
  {
    "a#": "\u0E30",
    //"a%": "\u0E31",
    aa: "\u0E32",
    an: "\u0E33",
    i: "\u0E34",
    ii: "\u0E35",
    "ui#": "\u0E36",
    uui: "\u0E37",
    u: "\u0E38",
    uu: "\u0E39",
    //"uu": "\u0E3A",
    oe: "\u0E40",
    ae: "\u0E41",
    ae: "\u0E41",
    o: "\u0E42",
    ai: "\u0E43",
    aai: "\u0E44",

    aa: "\u0abE",
    i: "\u0abF",
    ii: "\u0ac0",
    u: "\u0ac1",
    uu: "\u0ac2",
    r: "\u0ac3",
    rr: "\u0ac4",
    e: "\u0ac5",
    ai: "\u0ac7",
    aai: "\u0ac8",
    o: "\u0ac9",
    au: "\u0acB",
    aau: "\u0acC",
    "": "\u0acD",

    l: "\u0ae2",
    ll: "\u0ae3",
  },
);

require("fs").writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({
    name: "ไทย",
    dict,
  }),
);
