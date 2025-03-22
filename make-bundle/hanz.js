const fs = require("fs");
const { hanzToLatns } = require("./utility");

const dict = {};
for (const hanz in hanzToLatns)
  for (const latn of hanzToLatns[hanz]) {
    if (dict[latn]) {
      if (!dict[latn].includes(hanz)) dict[latn].push(hanz);
    } else dict[latn] = [hanz];
  }

fs.writeFileSync(
  __dirname + "/../SumiInput/dicts.bundle/hanz.json",
  JSON.stringify({ name: "漢", dict }, null, 2),
);
