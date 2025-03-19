exports.replaceEach = (s, replacements) =>
  replacements.reduce((acc, replacement) => acc.replace(...replacement), s);

exports.singletonKey = (o) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, [v]]));
