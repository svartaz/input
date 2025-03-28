const fs = require("fs");
const { capitalise, pushUniquelyToValue } = require("./_utility");

const dict = {};

const dictJa = require(
  __dirname + "/../../SumiInput/dicts.bundle/ja.json",
).dict;
for (const [key, words] of Object.entries(dictJa))
  for (const word of words)
    if (!/^\p{sc=Han}/u.test(word)) pushUniquelyToValue(dict, key, word);

const dictCmn = require(
  __dirname + "/../../SumiInput/dicts.bundle/cmn-plus.json",
).dict;
for (const [key, words] of Object.entries(dictCmn))
  for (const word of words) pushUniquelyToValue(dict, capitalise(key), word);

fs.writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({ name: "日華+", dict }),
);
