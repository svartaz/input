const fs = require("fs");
const { capitalise, replaceEach } = require("./utility");

const dict = {};

const dictJa = require(__dirname + "/../SumiInput/dicts.bundle/ja.json").dict;
for (const k in dictJa)
  for (const v of dictJa[k])
    if (!/^\p{sc=Han}/u.test(v))
      if (k in dict) {
        if (!dict[k].includes(v)) dict[k].push(v);
      } else dict[k] = [v];

const dictCmn = require(
  __dirname + "/../SumiInput/dicts.bundle/cmnPlus.json",
).dict;
for (const k in dictCmn)
  for (const v of dictCmn[k]) {
    const kCap = capitalise(k);

    if (kCap in dict) {
      if (!dict[kCap].includes(v)) dict[kCap].push(v);
    } else dict[kCap] = [v];
  }
fs.writeFileSync(
  __dirname + "/../SumiInput/dicts.bundle/jaCmnPlus.json",
  JSON.stringify({ name: "日華+", dict }, null, 2),
);
