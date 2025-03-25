const { abugida } = require("./utility");

const dict = abugida(
  {
    "@": "ঀ",
    "~": "\u0981",
    n$: "\u0982",
    h$: "\u0983",

    "*": "\u09bc", // nuqta
    "'": "ঽ", // avagraha

    "#a": "অ",
    "#aa": "আ",
    "#i": "ই",
    "#ii": "ঈ",
    "#u": "উ",
    "#uu": "ঊ",
    "#r": "ঋ",
    "#l": "ঌ",
    "#e": "এ",
    "#ai": "ঐ",
    "#o": "ও",
    "#au": "ঔ",

    "#rr": "ৠ",
    "#ll": "ৡ",

    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",

    rupee: "৲",
    taka: "৳",
    "1/": "৴",
    "2/": "৵",
    "3/": "৶",
    "4/": "৷",
    "pred/": "৸",
    "/16": "৹",
    isshar: "৺",
    ganda: "৻",
  },
  {
    q: "ক",
    qh: "খ",
    c: "গ",
    ch: "ঘ",
    g: "ঙ",

    k: "চ",
    kh: "ছ",
    z: "জ",
    zh: "ঝ",
    nj: "ঞ",

    tr: "ট",
    trh: "ঠ",
    dr: "ড",
    drh: "ঢ",
    nr: "ণ",

    t: "ত",
    th: "থ",
    d: "দ",
    dh: "ধ",
    n: "ন",

    p: "প",
    ph: "ফ",
    b: "ব",
    bh: "ভ",
    m: "ম",

    j: "য",
    r: "র",
    l: "ল",

    x: "শ",
    sr: "ষ",
    s: "স",
    h: "হ",

    "t*": "ৎ",

    "dr*": "ড়",
    "drh*": "ঢ়",
    "j*": "য়",

    "r*": "ৰ",
    v: "ৱ",
  },
  {
    aa: "\u09bE",
    i: "\u09bF",
    ii: "\u09c0",
    u: "\u09c1",
    uu: "\u09c2",
    r: "\u09c3",
    rr: "\u09c4",
    e: "\u09c7",
    ai: "\u09c8",
    o: "\u09cb",
    au: "\u09cc",
    "": "\u09cD", // virama

    av: "\u09D7",

    l: "\u09E2",
    L: "\u09e3",
  },
);

require("fs").writeFileSync(
  __dirname + `/../../SumiInput/dicts.bundle/beng.json`,
  JSON.stringify(
    {
      name: "বাংলা",
      dict,
    },
    null,
    2,
  ),
);
