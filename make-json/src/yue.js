const fs = require("fs");
const { replaceEach, scToTcs } = require("./utility.js");

const dict = {};

for (const line of fs
  .readFileSync(__dirname + "/../../submodules/unihan-database/kCantonese.txt")
  .toString()
  .trim()
  .split("\n")) {
  const row = line.split("\t");
  const hanz = row[0].split(" ")[1];
  const latnOld = row[2].replace(/\d$/, "");
  const toneOld = parseInt(row[2].slice(-1));

  if (latnOld === "" || isNaN(toneOld)) continue;

  const voiced = [4, 5, 6].includes(toneOld);

  const tone = /[ktp]$/.test(latnOld)
    ? 3
    : [1, 4].includes(toneOld)
    ? 0
    : [2, 5].includes(toneOld)
    ? 1
    : 2;

  const latn = replaceEach(latnOld, [
    [/^p/, "px"],
    [/^b/, "p"],

    [/^t/, "tx"],
    [/^d/, "t"],

    [/^c/, "tsx"],
    [/^z/, "ts"],

    [/^k/, "kx"],
    [/^g/, "k"],

    [/^h/g, "x"],
    [/ng/g, "g"],

    [/yu/g, "y"],
    [/eo/g, "oe"],
    [/aa$/, "a"],

    [/^j(?=i|y|oe)/, ""],
    [/^w(?=u)/, ""],

    [/(?<=[ieaou])i/, "j"],
    [/(?<=[ieaou])u/, "w"],

    ...(voiced
      ? [
          [/^k/, "c"],
          [/^ts/, "dz"],
          [/^t/, "d"],
          [/^p/, "b"],
          [/^s/, "z"],
          [/^f/, "v"],
          [/^x/, "h"],

          ...(tone < 2
            ? [
                [/(?<=c|dz?|b)(?!x)/, "h"],
                [/(?<=c|dz?|b)x/, ""],
              ]
            : []),
        ]
      : [[/^(?=[gnmljwiueoay])/, "q"]]),

    [/$/, ["", "q", "s", ""][tone]],
  ]);

  if (!(hanz in scToTcs))
    if (dict[latn]) dict[latn].push(hanz);
    else dict[latn] = [hanz];
}

fs.writeFileSync(
  __dirname + "/../../SumiInput/dicts.bundle/yue.json",
  JSON.stringify({ name: "cantonese", dict }, null, 2)
);
