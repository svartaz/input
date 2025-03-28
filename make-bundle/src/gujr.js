const { abugida } = require("./_utility");

const dict = abugida(
  {
    "~": "\u0a81",
    n$: "\u0a82",
    h$: "\u0a83",

    "#a": "અ",
    "#aa": "આ",
    "#i": "ઇ",
    "#ii": "ઈ",
    "#u": "ઉ",
    "#uu": "ઊ",
    "#r": "ઋ",
    "#l": "ઌ",
    "#e": "ઍ",
    "#ai": "એ",
    "#aai": "ઐ",
    "#o": "ઑ",
    "#au": "ઓ",
    "#aau": "ઔ",

    "*": "\u0abc", // nuqta
    "'": "ઽ", // avagraha
    aun: "ૐ", // avagraha

    "#rr": "ૠ",
    "#ll": "ૡ",

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

    _: "૰",
    rupee: "૱",
  },
  {
    q: "ક",
    qh: "ખ",
    c: "ગ",
    ch: "ઘ",
    g: "ઙ",

    k: "ચ",
    kh: "છ",
    z: "જ",
    zh: "ઝ",
    nj: "ઞ",

    tr: "ટ",
    trh: "ઠ",
    dr: "ડ",
    drh: "ઢ",
    nr: "ણ",

    t: "ત",
    th: "થ",
    d: "દ",
    dh: "ધ",
    n: "ન",

    p: "પ",
    ph: "ફ",
    b: "બ",
    bh: "ભ",
    m: "મ",

    j: "ય",
    r: "ર",
    l: "લ",
    lr: "ળ",
    v: "વ",

    x: "શ",
    sr: "ષ",
    s: "સ",
    h: "હ",
  },
  {
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
    name: "ગુજરાતી",
    dict,
  }),
);
