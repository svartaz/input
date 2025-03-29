// https://www.unicode.org/Public/UNIDATA/Unihan.zip

const fs = require("fs");
const {
  replaceEach,
  pushUniquelyToValue,
  hanzToLatns,
} = require("./_utility.js");

const dictPlain = require(
  __dirname + "/../../SumiInput/dicts.bundle/cmn.json",
).dict;

const dict = {};
for (const [k, words] of Object.entries(dictPlain))
  for (const word of words) {
    const kNew = k
      .split(" ")
      .map((syllable, i) => {
        const hanz = word[i];

        if (hanz in hanzToLatns) {
          const latnsMc = hanzToLatns[hanz];

          if (latnsMc.every((l) => /^(ts|dz|s|z)/.test(l)))
            syllable = replaceEach(syllable, [
              [/^c(?=[iy])/, "z"],
              [/^k(?=[iy])/, "ts"],
              [/^h(?=[iy])/, "s"],
            ]);

          if (latnsMc.every((l) => /^g/.test(l)))
            syllable = syllable.replace(/^(?=[iuyea])/, "g");

          if (latnsMc.every((l) => /[ktp]$/.test(l)))
            // if not nasal coda
            syllable = syllable.replace(
              /(?<![gn])(?=[/<\\>*]|(?<![/<\\>*])$)/,
              "h",
            );

          if (latnsMc.every((l) => /m[qs]?$/.test(l)))
            syllable = syllable.replace(/n(?=[/<\\>*]?$)/, "m");
        }

        return syllable;
      })
      .join(" ");

    pushUniquelyToValue(dict, kNew, word);
  }

fs.writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({ name: "華+", dict }),
);

// extra
fs.writeFileSync(
  __filename.replace(
    /[^\/]+$/,
    (it) => `../../extra/${it.replace(/\.js/, ".tsv")}`,
  ),

  Object.entries(dict)
    .flatMap(([k, ws]) => ws.sort().map((w) => [w, k]))
    .sort()
    .map(([w, k]) => w + "\t" + k)
    .join("\n"),
);
