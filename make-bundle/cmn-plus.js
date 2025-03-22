// https://www.unicode.org/Public/UNIDATA/Unihan.zip

const fs = require("fs");
const { replaceEach, hanzToLatns, pushUniq } = require("./utility.js");

const dictPlain = require(
  __dirname + "/../SumiInput/dicts.bundle/cmn.json",
).dict;

const dict = {};
for (const k in dictPlain)
  for (const word of dictPlain[k]) {
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

          if (latnsMc.every((l) => /m[qs]?$/.test(l)))
            syllable = syllable.replace(/n(?=[\|\/<\\]?$)/, "m");

          if (latnsMc.every((l) => /[ktp]$/.test(l)))
            // if not nasal coda
            syllable = syllable.replace(/(?<![gnm])(?=[\|\/<\\]?$)/, "h");
        }

        return syllable;
      })
      .join(" ");

    dict[kNew] = kNew in dict ? pushUniq(dict[kNew], word) : [word];
  }

fs.writeFileSync(
  __dirname + "/../SumiInput/dicts.bundle/cmn-plus.json",
  JSON.stringify({ name: "華+", dict }),
);
