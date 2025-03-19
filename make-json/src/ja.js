const fs = require("fs");
const {
  replaceEach,
  scToTcs,
  valueToSingleton,
  hanzInRange,
} = require("./utility");

// hira, kana
const dict = valueToSingleton({
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",
  _a: "ぁ",
  _i: "ぃ",
  _u: "ぅ",
  _e: "ぇ",
  _o: "ぉ",
  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",
  _ko: "𛄲",
  ca: "が",
  ci: "ぎ",
  cu: "ぐ",
  ce: "げ",
  co: "ご",
  sa: "さ",
  si: "し",
  su: "す",
  se: "せ",
  so: "そ",
  za: "ざ",
  zi: "じ",
  zu: "ず",
  ze: "ぜ",
  zo: "ぞ",
  ta: "た",
  ti: "ち",
  tu: "つ",
  te: "て",
  to: "と",
  _tu: "っ",
  da: "だ",
  di: "ぢ",
  du: "づ",
  de: "で",
  do: "ど",
  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",
  fa: "は",
  fi: "ひ",
  fu: "ふ",
  fe: "へ",
  fo: "ほ",
  pa: "ぱ",
  pi: "ぴ",
  pu: "ぷ",
  pe: "ぺ",
  po: "ぽ",
  ba: "ば",
  bi: "び",
  bu: "ぶ",
  be: "べ",
  bo: "ぼ",
  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",
  ja: "や",
  ji: "𛀆",
  ju: "ゆ",
  je: "𛀁",
  jo: "よ",
  _ja: "ゃ",
  _ju: "ゅ",
  _jo: "ょ",
  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",
  wa: "わ",
  wi: "ゐ",
  wu: "𛄟",
  we: "ゑ",
  wo: "を",
  _wa: "ゎ",
  _wi: "𛅐",
  _we: "𛅑",
  _wo: "𛅒",
  n: "ん",
  iti: "ゝ",
  "iti:": "ゞ",

  A: "ア",
  I: "イ",
  U: "ウ",
  E: "エ",
  "E*": "𛀀",
  O: "オ",
  _A: "ァ",
  _I: "ィ",
  _U: "ゥ",
  _E: "ェ",
  _O: "ォ",
  KA: "カ",
  KI: "キ",
  KU: "ク",
  KE: "ケ",
  KO: "コ",
  _KA: "ヵ",
  _KU: "ㇰ",
  _KE: "ヶ",
  _KO: "𛅕",
  CA: "ガ",
  CI: "ギ",
  CU: "グ",
  CE: "ゲ",
  CO: "ゴ",
  SA: "サ",
  SI: "シ",
  SU: "ス",
  SE: "セ",
  SO: "ソ",
  _SI: "ㇱ",
  _SU: "ㇲ",
  ZA: "ザ",
  ZI: "ジ",
  ZU: "ズ",
  ZE: "ゼ",
  ZO: "ゾ",
  TA: "タ",
  TI: "チ",
  TU: "ツ",
  TE: "テ",
  TO: "ト",
  _TU: "ッ",
  _TO: "ㇳ",
  DA: "ダ",
  DI: "ヂ",
  DU: "ヅ",
  DE: "デ",
  DO: "ド",
  NA: "ナ",
  NI: "ニ",
  NU: "ヌ",
  NE: "ネ",
  NO: "ノ",
  _NU: "ㇴ",
  FA: "ハ",
  FI: "ヒ",
  FU: "フ",
  FE: "ヘ",
  FO: "ホ",
  _FA: "ㇵ",
  _FI: "ㇶ",
  _FU: "ㇷ",
  _FE: "ㇸ",
  _FO: "ㇹ",
  PA: "パ",
  PI: "ピ",
  PU: "プ",
  PE: "ペ",
  PO: "ポ",
  BA: "バ",
  BI: "ビ",
  BU: "ブ",
  BE: "ベ",
  BO: "ボ",
  MA: "マ",
  MI: "ミ",
  MU: "ム",
  ME: "メ",
  MO: "モ",
  _MU: "ㇺ",
  JA: "ヤ",
  JI: "𛄠",
  JU: "ユ",
  JE: "𛄡",
  JO: "ヨ",
  _JA: "ャ",
  _JU: "ュ",
  _JO: "ョ",
  RA: "ラ",
  RI: "リ",
  RU: "ル",
  RE: "レ",
  RO: "ロ",
  _RA: "ㇻ",
  _RI: "ㇼ",
  _RU: "ㇽ",
  _RE: "ㇾ",
  _RO: "ㇿ",
  WA: "ワ",
  WI: "ヰ",
  WU: "𛄢",
  WE: "ヱ",
  WO: "ヲ",
  _WA: "ヮ",
  _WI: "𛅤",
  _WE: "𛅥",
  _WO: "𛅦",
  VA: "ヷ",
  VI: "ヸ",
  VU: "ヴ",
  VE: "ヹ",
  VO: "ヺ",
  N: "ン",
  _N: "𛅧",
  ITI: "ヽ",
  "ITI:": "ヾ",

  "-": "ー",
  "#:": "\u3099",
  ":": "゛",
  "#@": "\u309a",
  "@": "゜",
  ",": "、",
  ".": "。",
  "?": "？",
  "!": "！",
  "*": "・",
  "..": "‥",
  "...": "…",
  "(": "（",
  ")": "）",
  "[": "「",
  "]": "」",
  "[[": "『",
  "]]": "』",
});

for (const isKata of [false, true]) {
  for (const k0 of "k c s z t d n f p b m j r w v".split(" "))
    for (const [vowel, ks1] of [
      ["i", "ja ju jo"],
      ["u", "wa wi we wo"],
    ])
      for (const k1 of ks1.split(" ")) {
        const v0 = isKata ? dict[(k0 + vowel).toUpperCase()] : dict[k0 + vowel];
        const v1 = isKata ? dict["_" + k1.toUpperCase()] : dict["_" + k1];
        const k = isKata ? (k0 + k1).toUpperCase() : k0 + k1;

        if (v0 && v1) dict[k] = [v0 + v1];
      }

  for (const k0 of "k c s z t d f p b r v".split(" "))
    for (const k1 of "a i u e o".split(" ")) {
      const v0 = isKata ? dict["_TU"] : dict["_tu"];
      const v1 = isKata ? dict[(k0 + k1).toUpperCase()] : dict[k0 + k1];
      const k = isKata ? (k0 + k0 + k1).toUpperCase() : k0 + k0 + k1;

      if (v1) dict[k] = [v0 + v1];
    }
}

// hanz
for (const line of fs
  .readFileSync(process.env.HOME + "/Downloads/Unihan/Unihan_Readings.txt")
  .toString()
  .trim()
  .split("\n"))
  if (line[0] !== "#") {
    const row = line.split(/\t/g);
    if (row[1] !== "kJapaneseOn") continue;

    const hanz = String.fromCharCode(parseInt(row[0].replace("U+", "0x")));
    if (!hanzInRange(hanz)) continue;
    if (hanz in scToTcs) continue;
    if (!hanzInRange(hanz)) {
      console.log("uncommon", hanz);
      continue;
    }

    for (const latnOld of row[2].split(/ /g)) {
      latn = replaceEach(latnOld.toLowerCase(), [
        [/shi/g, "si"],
        [/sh/g, "sy"],
        [/ji/g, "zi"],
        [/j/g, "zy"],
        [/tsu/g, "tu"],
        [/chi/g, "ti"],
        [/ch/g, "ty"],
        [/h/g, "f"],
        [/g/g, "c"],
        [/y/g, "j"],

        [/juu/g, "iu"],
        [/jou/g, "eu"],

        [/(?<=[aiueo][ktf])[iu]$/g, ""],
      ]);

      if (hanz === "出") console.log(hanz, latn);

      if (/[aiueo][^aiueo][aiueo]/.test(latn)) {
        //console.log("two vowels", hanz, latn);
        continue;
      }

      if (/[auieo]{3,}/.test(latn)) {
        //console.log("three vowel", hanz, latn);
        continue;
      }

      if (/a[aeo]|i[aieo]|u[aeo]|e[aeo]|o[aeo]/.test(latn)) {
        //console.log("hiatus", hanz, latn);
        continue;
      }

      latn = latn.slice(0, 1).toUpperCase() + latn.slice(1);

      if (dict[latn]) {
        if (!dict[latn].includes(hanz)) dict[latn].push(hanz);
      } else dict[latn] = [hanz];
    }
  }

fs.writeFileSync(
  __dirname + "/../../SumiInput/dicts.bundle/ja.json",
  JSON.stringify({ name: "japanese", dict }, null, 2),
);
