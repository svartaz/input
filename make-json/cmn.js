// https://www.unicode.org/Public/UNIDATA/Unihan.zip

const fs = require("fs");
const { replaceEach, scToTcs, hanzInRange } = require("./utility.js");

const dict = {};

for (const line of fs
  .readFileSync(__dirname + "/../submodules/pinyin-data/kMandarin.txt")
  .toString()
  .trim()
  .split("\n")) {
  const row = line.replace(/ *#.+$/, "").split(": ");
  const hanz = String.fromCharCode(parseInt(row[0].replace("U+", "0x")));

  for (const latnOld of row[1].split(" ")) {
    let latn = latnOld.normalize("NFKD");
    const tone = /\u0304/.test(latn)
      ? 0
      : /\u0301/.test(latn)
        ? 1
        : /\u030C/.test(latn)
          ? 2
          : /\u0300/.test(latn)
            ? 3
            : 4;

    /*vw
      b  p  f  m
      d  t     n
      z  ts s  l
      j  tx x  r
      c  k  h  g
      i u y
      e a
    */

    latn = replaceEach(latn, [
      [/[\u0304\u0301\u030C\u0300]/, ""],
      [/.+/, (it) => it.normalize("NFKC")],

      [/(?<=[jqx])u/, "ü"],
      [/(?<=[bpmf])o/, "uo"],

      [/^j/, "g"],
      [/^q/, "k"],
      [/^x/, "h"],

      [/^yu/, "ü"],
      [/^yi/, "i"],
      [/^y/, "i"],
      [/^wu/, "u"],
      [/^w/, "u"],

      [/ao/, "au"],
      [/ong/, "ung"],
      [/iong/, "üng"],
      [/o/, "e"],

      [/^zh/, "j"],
      [/^ch/, "tx"],
      [/^sh/, "x"],

      [/^c/, "ts"],
      [/^g/, "c"],
      [/ng$/, "g"],

      [/ü/, "y"],

      [/(?<=[iuy])e(?=[iugn])/, ""],
      [/(?<=^(z|t?s|j|t?x|r))i$/, ""],

      [/$/, ["", "/", "<", "\\", "*"][tone]],
    ]);

    if (!hanzInRange(hanz)) continue;

    for (const h of hanz in scToTcs ? scToTcs[hanz] : [hanz])
      if (dict[latn]) dict[latn].push(hanz);
      else dict[latn] = [hanz];
  }
}

fs.writeFileSync(
  __dirname + "/../SumiInput/dicts.bundle/cmn.json",
  JSON.stringify({ name: "華語", dict }, null, 2),
);
