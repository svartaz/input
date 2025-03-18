module.exports = (s, replacements) =>
  replacements.reduce((acc, replacement) => acc.replace(...replacement), s);
