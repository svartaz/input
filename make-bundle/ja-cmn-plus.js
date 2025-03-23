const fs = require("fs");
const { capitalise, pushUniquelyToValue } = require("./utility");

const dict = {};

const dictJa = require(__dirname + "/../SumiInput/dicts.bundle/ja.json").dict;
for (const [k, words] of Object.entries(dictJa))
  for (const word of words)
    if (!/^\p{sc=Han}/u.test(word)) pushUniquelyToValue(dict, k, word);

const dictCmn = require(
  __dirname + "/../SumiInput/dicts.bundle/cmn-plus.json",
).dict;
for (const [k, words] of Object.entries(dictCmn))
  for (const word of words) pushUniquelyToValue(dict, capitalise(k), word);

fs.writeFileSync(
  __dirname + "/../SumiInput/dicts.bundle/ja-cmn-plus.json",
  JSON.stringify({ name: "日華+", dict }),
);
