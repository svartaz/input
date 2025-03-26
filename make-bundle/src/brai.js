// https://en.wikipedia.org/wiki/Braille_ASCII

const dict = Object.fromEntries(
  [..." A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)="].map(
    (c, i) => [c.toLowerCase(), [String.fromCharCode(0x2800 + i)]],
  ),
);

require("fs").writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({ name: "⠃⠗⠁⠊⠇⠇⠑", dict }),
);
