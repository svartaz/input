const fs = require("fs");
const { replaceEach, scToTcs } = require("./utility");

const data = fs
  .readFileSync(__dirname + "/../submodules/Zyevio/隋語廣韻全字表.csv")
  .toString()
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const row = line.split(",");
    const hanz = row[1];
    const latnOld = row[2].normalize("NFD").replace(/[\u0301\u0302]/, "");
    const tone = "平上去入".indexOf(row[10]);
    const latn = replaceEach(latnOld, [
      [/ьʼ/, "j'"],

      [/^x/, "h"],
      [/^qh/, "x"],

      [/^c/, "ts"], // ț
      [/^dz/, "dz"], // d̦

      [/^g/, "c"],
      [/ŋ/g, "g"],

      [/^sh/, "ss"], // š
      [/^zh/, "zz"], // ž

      [/^kh/, "kx"], // ꝁ
      [/^th/, "tx"], // ŧ
      [/^tsh/, "tsx"], // ṯ
      [/^ph/, "px"], // ꝑ

      [/ə/, "v"],

      [/$/, ["", "q", "s", ""][tone]],
    ]).normalize("NFKC");

    return `${hanz}\t${latn}`;
  });

const dict = {};
for (const line of data) {
  const [hanz, latn] = line.split("\t");

  for (const h of hanz in scToTcs ? scToTcs[hanz] : [hanz])
    if (dict[latn]) {
      if (!dict[latn].includes(hanz)) dict[latn].push(hanz);
    } else dict[latn] = [hanz];
}

fs.writeFileSync(
  __dirname + "/../SumiInput/dicts.bundle/hanz.json",
  JSON.stringify({ name: "漢字", dict }, null, 2),
);
