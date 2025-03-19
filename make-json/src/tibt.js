const { singletonKey } = require("./util");

const dict = {
  " ": "་",
  ",": "།",
  ".": "༎",

  0: "༠",
  1: "༡",
  2: "༢",
  3: "༣",
  4: "༤",
  5: "༥",
  6: "༦",
  7: "༧",
  8: "༨",
  9: "༩",

  "(": "༺",
  ")": "༻",
  "{": "༼",
  "}": "༽",

  ka: "ཀ",
  kxa: "ཁ",
  ca: "ག",
  cha: "གྷ",
  ga: "ང",

  tja: "ཅ",
  txja: "ཆ",
  dja: "ཇ",
  nja: "ཉ",

  "t*a": "ཊ",
  "t*xa": "ཋ",
  "d*a": "ཌ",
  "d*ha": "ཌྷ",
  "n*a": "ཎ",

  t: "ཏ",
  tx: "ཐ",
  d: "ད",
  dh: "དྷ",
  n: "ན",

  p: "པ",
  px: "ཕ",
  b: "བ",
  bh: "བྷ",
  m: "མ",

  ts: "ཙ",
  tsx: "ཚ",
  dz: "ཛ",
  dzh: "ཛྷ",

  w: "ཝ",
  zj: "ཞ",
  z: "ཟ",
  h: "འ",
  j: "ཡ",
  r: "ར",
  l: "ལ",
  sj: "ཤ",
  "s*": "ཥ",
  s: "ས",
  x: "ཧ",
  q: "ཨ",

  "-k": "\u0F90",
  "-kx": "\u0F91",
  "-c": "\u0F92",
  "-ch": "\u0F93",
  "-g": "\u0F94",

  "-tj": "\u0F95",
  "-txj": "\u0F96",
  "-d": "\u0F97",
  "-nj": "\u0F99",

  "-t*": "\u0F9a",
  "-t*x": "\u0F9b",
  "-d*": "\u0F9c",
  "-d*h": "\u0F9d",
  "-n*": "\u0F9e",

  "-t": "\u0F9f",
  "-tx": "\u0Fa0",
  "-d": "\u0Fa1",
  "-dh": "\u0Fa2",
  "-n": "\u0Fa3",

  "-p": "\u0F94",
  "-px": "\u0Fa5",
  "-b": "\u0Fa6",
  "-bh": "\u0Fa7",
  "-m": "\u0Fa8",

  "-ts": "\u0F99",
  "-tsx": "\u0Faa",
  "-dz": "\u0Fab",
  "-dzh": "\u0Fac",

  "-w": "\u0Fad",
  "-zj": "\u0Fae",
  "-z": "\u0Faf",
  "-h": "\u0Fb0",
  "-j": "\u0Fb1",
  "-r": "\u0Fb2",
  "-l": "\u0Fb3",
  "-sj": "\u0Fb4",
  "-s*": "\u0Fb5",
  "-s": "\u0Fb6",
  "-x": "\u0Fb7",
  "-q": "\u0Fb8",
  "-ks*": "\u0Fb9",

  aa: "\u0f71",
  i: "\u0f72",
  ii: "\u0f73",
  u: "\u0f74",
  uu: "\u0f75",
  "-r$": "\u0f76",
  rr: "\u0f77",
  "-l$": "\u0f78",
  ll: "\u0f79",
  e: "\u0f7a",
  ee: "\u0f7b",
  o: "\u0f7c",
  oo: "\u0f7d",

  "#": "\u0f84",
};

require("fs").writeFileSync(
  __dirname + `/../../SumiInput/dicts.bundle/tibt.json`,
  JSON.stringify(
    {
      name: "tibetan",
      dict: singletonKey(dict),
    },
    null,
    2
  )
);
