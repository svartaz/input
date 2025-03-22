const { valueToSingleton } = require("./utility");

const dict = {
  " ": " ",

  nn: "\u0902",
  ss: "\u0903",

  a: "अ",
  aa: "आ",
  i: "इ",
  ii: "ई",
  u: "उ",
  uu: "ऊ",
  r: "ऋ",
  l: "ऌ",
  e: "ऎ",
  ai: "ए",
  aai: "ऐ",
  o: "ऒ",
  au: "ओ",
  aau: "औ",

  qa: "क",
  qha: "ख",
  ca: "ग",
  cha: "घ",
  ga: "ङ",

  ka: "च",
  kha: "छ",
  za: "ज",
  zha: "झ",
  nja: "ञ",
  ja: "य",

  tra: "ट",
  trha: "ठ",
  dra: "ड",
  drha: "ढ",
  nra: "ण",
  ra: "र",

  ta: "त",
  tha: "थ",
  da: "द",
  dha: "ध",
  na: "न",
  la: "ल",

  pa: "प",
  pha: "फ",
  ba: "ब",
  bha: "भ",
  ma: "म",
  va: "व",

  xa: "श",
  sra: "ष",
  sa: "स",
  ha: "ह",

  "*": "\u093c",
  "'": "ऽ",

  "-aa": "\u093E",
  "-i": "\u093F",
  "-ii": "\u0940",
  "-u": "\u0941",
  "-uu": "\u0942",
  "-r": "\u0943",
  "-rr": "\u0944",
  "-e": "\u0946",
  "-ai": "\u0947",
  "-aai": "\u0948",
  "-o": "\u094A",
  "-au": "\u094B",
  "-aau": "\u094C",

  "#": "\u094D",

  "q*a": "क़",
  "qh*a": "ख़",
  "ch*a": "ग़",
  "z*a": "ज़",
  "dr*a": "ड़",
  "drh*a": "ढ़",
  "ph*a": "फ़",
  "j*a": "य़",

  rr: "ॠ",
  ll: "ॡ",

  "-l": "\u0962",
  "-ll": "\u0963",

  ".": "।",
  "..": "॥",

  0: "०",
  1: "१",
  2: "२",
  3: "३",
  4: "४",
  5: "५",
  6: "६",
  7: "७",
  8: "८",
  9: "९",
};

const dictComposed = {};

for (const [k, v] of Object.entries(dict))
  if (/[^a]a$/.test(k)) dictComposed[k.replace(/a$/, "")] = v + dict["#"];

for (const [k, v] of Object.entries(dict))
  if (/[^a]a$/.test(k))
    for (const [k1, v1] of Object.entries(dict))
      if (/^-/.test(k1))
        dictComposed[k.replace(/a$/, "") + k1.replace(/^-/, "")] = v + v1;

require("fs").writeFileSync(
  __dirname + `/../SumiInput/dicts.bundle/deva.json`,
  JSON.stringify(
    {
      name: "देवनागरी",
      dict: valueToSingleton({ ...dict, ...dictComposed }),
    },
    null,
    2,
  ),
);
