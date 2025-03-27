const fs = require("fs");

/*
b d z  j  c er e  en ei |
p t ts tx k i  a  an ai /
f * s  x  h u  eg em eu <
m n l  r  g y  ag am au \
*/

const { replaceEach } = require("./utility");

const fastToNormal = {
  1: "b",
  q: "p",
  a: "f",
  z: "m",

  2: "d",
  w: "t",
  s: "*",
  x: "n",

  3: "z",
  e: "ts",
  d: "s",
  c: "l",

  4: "j",
  r: "tx",
  f: "x",
  v: "r",

  5: "c",
  t: "k",
  g: "h",
  b: "g",

  6: "er",
  y: "i",
  h: "u",
  n: "y",

  7: "e",
  u: "a",
  j: "eg",
  m: "ag",

  8: "en",
  i: "an",
  k: "em",
  ",": "am",

  9: "ei",
  o: "ai",
  l: "eu",
  ".": "au",

  0: "|",
  p: "/",
  ":": "<",
  "?": "\\",
};

const dictNormal = require(
  __dirname + "/../../SumiInput/dicts.bundle/cmn-plus.json",
).dict;

const dict = {};
for (const [k, ws] of Object.entries(dictNormal)) {
  const kNew = k
    .split(" ")
    .map((latn) => {
      latn = replaceEach(latn, [
        [/(?<!^)h/, ""],
        [/(?<!^|[ea])(?=[gnm])/, "e"],
      ]);

      for (const length of [2, 1])
        for (const [short, long] of Object.entries(fastToNormal))
          if (long.length == length)
            latn = latn.replace(long, short.toUpperCase());

      return latn;
    })
    .join(" ");

  dict[kNew] = ws;
}

fs.writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({ name: "華速", dict }),
);
