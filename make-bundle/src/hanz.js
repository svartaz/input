const fs = require("fs");
const { pushUniquelyToValue, hanzToLatns } = require("./utility");

const dict = {};
for (const [hanz, latns] of Object.entries(hanzToLatns))
  for (const latn of latns) pushUniquelyToValue(dict, latn, hanz);

fs.writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({ name: "漢", dict }),
);
