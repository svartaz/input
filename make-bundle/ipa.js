/*
n nasal
t plosive
d plosive voiced
s sibilant
z sibilant voiced
f fricative
v fricative voiced
j aproximant
r tap
i trill
e lateral fricative
l lateral approximant
a lateral tap

p bilabial
f labio-dental
i linguo-labial
t dental
s alveolar
e palato-alveolar
r retro­flex
j palatal
k velar
q uvular
a pharyn­geal
h glottal
*/

require("fs").writeFileSync(
  __dirname + `/../SumiInput/dicts.bundle/ipa.json`,
  JSON.stringify(
    {
      name: "ipa",
      dict: {
        "f ld": ["ɸ"],
        "v ld": ["β"],

        "m ld": ["ɱ"],
        "v approx": ["ʋ"],
        "v tap": ["ⱱ"],

        "t fric": ["θ"],
        "d fric": ["ð"],
        "r approx": ["ɹ"],
        "r tap": ["ɾ"],
      },
    },
    null,
    2,
  ),
);
