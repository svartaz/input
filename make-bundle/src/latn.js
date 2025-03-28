const { valueToSingleton } = require("./_utility");

const dict = {
  // Latin-1 Supplement
  // U+00C0
  "A\\": "À",
  "A/": "Á",
  "A>": "Â",
  "A~": "Ã",
  "A:": "Ä",
  "A@": "Å",
  AE: "Æ",
  "C,": "Ç",
  "E\\": "È",
  "E/": "É",
  "E>": "Ê",
  "E:": "Ë",
  "I\\": "Ì",
  "I/": "Í",
  "I>": "Î",
  "I:": "Ï",

  // U+00D0
  DH: "Ð",
  "N~": "Ñ",
  "O\\": "Ò",
  "O/": "Ó",
  "O>": "Ô",
  "O~": "Õ",
  "O:": "Ö",
  "O slash": "Ø",
  "U\\": "Ù",
  "U/": "Ú",
  "U>": "Û",
  "U:": "Ü",
  "Y/": "Ý",
  TH: "Þ",
  sz: "ß",

  // U+00E0
  "a\\": "à",
  "a/": "á",
  "a>": "â",
  "a~": "ã",
  "a:": "ä",
  "a@": "å",
  ae: "æ",
  "c,": "ç",
  "e\\": "è",
  "e/": "é",
  "e>": "ê",
  "e:": "ë",
  "i\\": "ì",
  "i/": "í",
  "i>": "î",
  "i:": "ï",

  // U+00F0
  dh: "ð",
  "n~": "ñ",
  "o\\": "ò",
  "o/": "ó",
  "o>": "ô",
  "o~": "õ",
  "o:": "ö",
  "o slash": "ø",
  "u\\": "ù",
  "u/": "ú",
  "u>": "û",
  "u:": "ü",
  "y/": "ý",
  th: "þ",
  "y:": "ÿ",

  // Latin Extended-A
  // U+0100
  "A|": "Ā",
  "a|": "ā",
  "A(": "Ă",
  "a(": "ă",
  "A,": "Ą",
  "a,": "ą",
  "C/": "Ć",
  "c/": "ć",
  "C>": "Ĉ",
  "c>": "ĉ",
  "C*": "Ċ",
  "c*": "ċ",
  "C<": "Č",
  "c<": "č",
  "D<": "Ď",
  "d<": "ď",

  // U+0110
  "D-": "Đ",
  "d-": "đ",
  "E|": "Ē",
  "e|": "ē",
  "E(": "Ĕ",
  "e(": "ĕ",
  "E*": "Ė",
  "e*": "ė",
  "E,": "Ę",
  "e,": "ę",
  "E<": "Ě",
  "e<": "ě",
  "G>": "Ĝ",
  "g>": "ĝ",
  "G(": "Ğ",
  "g(": "ğ",

  // U+0120
  "G*": "Ġ",
  "g*": "ġ",
  "G,": "Ģ",
  "g,": "ģ",
  "H>": "Ĥ",
  "h>": "ĥ",
  "H-": "Ħ",
  "h-": "ħ",
  "I~": "Ĩ",
  "i~": "ĩ",
  "I|": "Ī",
  "i|": "ī",
  "I(": "Ĭ",
  "i(": "ĭ",
  "I,": "Į",
  "i,": "į",

  // U+0130
  "I*": "İ",
  "i*": "ı",
  IJ: "Ĳ",
  ij: "ĳ",
  "J>": "Ĵ",
  "j>": "ĵ",
  "K,": "Ķ",
  "k,": "ķ",
  //"": "ĸ",
  "L/": "Ĺ",
  "l/": "ĺ",
  "L,": "Ļ",
  "l,": "ļ",
  "L<": "Ľ",
  "l<": "ľ",
  "L.": "Ŀ",

  // U+0140
  "l.": "ŀ",
  "L-": "Ł",
  "l-": "ł",
  "N/": "Ń",
  "n/": "ń",
  "N,": "Ņ",
  "n,": "ņ",
  "N<": "Ň",
  "n<": "ň",
  "'n": "ŉ",
  NG: "Ŋ",
  ng: "ŋ",
  "O|": "Ō",
  "o|": "ō",
  "O(": "Ŏ",
  "o(": "ŏ",

  // U+0150
  "O//": "Ő",
  "o//": "ő",
  OE: "Œ",
  oe: "œ",
  "R/": "Ŕ",
  "r/": "ŕ",
  "R,": "Ŗ",
  "r,": "ŗ",
  "R<": "Ř",
  "r<": "ř",
  "S/": "Ś",
  "s/": "ś",
  "S>": "Ŝ",
  "s>": "ŝ",
  "S,": "Ş",
  "s,": "ş",

  // U+0160
  "S<": "Š",
  "s<": "š",
  "T,": "Ţ",
  "t,": "ţ",
  "T<": "Ť",
  "t<": "ť",
  "T-": "Ŧ",
  "t-": "ŧ",
  "U~": "Ũ",
  "u~": "ũ",
  "U|": "Ū",
  "u|": "ū",
  "U(": "Ŭ",
  "u(": "ŭ",
  "U@": "Ů",
  "u@": "ů",

  // U+0170
  "U//": "Ű",
  "u//": "ű",
  "U,": "Ų",
  "u,": "ų",
  "W>": "Ŵ",
  "w>": "ŵ",
  "Y>": "Ŷ",
  "y>": "ŷ",
  "Y:": "Ÿ",
  "Z/": "Ź",
  "z/": "ź",
  "Z*": "Ż",
  "z*": "ż",
  "Z<": "Ž",
  "z<": "ž",
  "s long": "ſ",

  // Latin Extended-B
  // U+0180
  "b-": "ƀ",
  "B hook": "Ɓ",
  "B|": "Ƃ",
  "b|": "ƃ",
  "o open": "Ɔ",
  "C hook": "Ƈ",
  "c hook": "ƈ",
  "D tail": "Ɖ",
  "D hook": "Ɗ",
  "D|": "Ƌ",
  "d|": "ƌ",
  "d greek turn": "ƍ",
  "E turn": "Ǝ",
  SCHWA: "Ə",

  // U+0190
  "E open": "Ɛ",
  "F hook": "Ƒ",
  "f hook": "ƒ",
  "G hook": "Ɠ",
  "c greek": "Ɣ",
  hu: "ƕ",
  "I greek": "Ɩ",
  "I-": "Ɨ",
  "K hook": "Ƙ",
  "k hook": "ƙ",
  "l-": "ƚ",
  "l- greek": "ƛ",
  "M turn": "Ɯ",
  "N hook": "Ɲ",
  "n long": "ƞ",
  "O tilde": "Ɵ",

  // U+01A0
  "O'": "Ơ",
  "o'": "ơ",
  "Q var": "Ƣ",
  "q var": "ƣ",
  "P hook": "Ƥ",
  "p hook": "ƥ",
  YR: "Ʀ",
  //"TONE 2": "Ƨ",
  //"tone 2": "ƨ",
  "S greek": "Ʃ",
  "s greek loop": "ƪ",
  "t palatal": "ƫ",
  "T hook": "Ƭ",
  "t hook": "ƭ",
  "T retroflex": "Ʈ",
  "U'": "Ư",

  // U+01B0
  "u'": "ư",
  "U greek": "Ʊ",
  "V hook": "Ʋ",
  "Y hook": "Ƴ",
  "y hook": "ƴ",
  "Z-": "Ƶ",
  "z-": "ƶ",
  ZH: "Ʒ",
  "ZH flip": "Ƹ",
  "zh flip": "ƹ",
  "zh tail": "ƺ",
  "2-": "ƻ",
  //"": "Ƽ",
  //"": "ƽ",
  "?- turn": "ƾ",
  wynn: "ƿ",

  // U+01C0
  "kl click": "ǀ",
  "kll click": "ǀ",
  //"kll click": "ǀ",
  "DZ<": "Ǆ",
  "Dz<": "ǅ",
  "dz<": "ǆ",
  LJ: "Ǉ",
  Lj: "ǈ",
  lj: "ǉ",
  NJ: "Ǌ",
  Nj: "ǋ",
  nj: "ǌ",
  "A<": "Ǎ",
  "a<": "ǎ",
  "I<": "Ǐ",

  // U+01D0
  "i<": "ǐ",
  "O<": "Ǒ",
  "o<": "ǒ",
  "U<": "Ǔ",
  "u<": "ǔ",
  "U:|": "Ǖ",
  "u:|": "ǖ",
  "U:/": "Ǘ",
  "u:/": "ǘ",
  "U:<": "Ǚ",
  "u:<": "ǚ",
  "U:\\": "Ǜ",
  "u:\\": "ǜ",
  "e turn": "ǝ",
  "A:|": "Ǟ",
  "a:|": "ǟ",

  // U+01E0
  "A*|": "Ǡ",
  "a*|": "ǡ",
  "AE|": "Ǣ",
  "ae|": "ǣ",
  "G-": "Ǥ",
  "g-": "ǥ",
  "G<": "Ǧ",
  "g<": "ǧ",
  "K<": "Ǩ",
  "k<": "ǩ",
  "O,": "Ǫ",
  "o,": "ǫ",
  "O|,": "Ǭ",
  "o|,": "ǭ",
  "ZH<": "Ǯ",
  "zh<": "ǯ",

  // U+01F0
  "j<": "ǰ",
  DZ: "Ǳ",
  Dz: "ǲ",
  dz: "ǳ",
  "G/": "Ǵ",
  "g/": "ǵ",
  HU: "Ƕ",
  WYNN: "Ƿ",
  "N\\": "Ǹ",
  "n\\": "ǹ",
  "A@/": "Ǻ",
  "a@/": "ǻ",
  "AE/": "Ǽ",
  "ae/": "ǽ",
  "O/ slash": "Ǿ",
  "o/ slash": "ǿ",

  // U+0200
  "A\\\\": "Ȁ",
  "a\\\\": "ȁ",
  "A)": "Ȃ",
  "a)": "ȃ",
  "E\\\\": "Ȅ",
  "e\\\\": "ȅ",
  "E)": "Ȇ",
  "e)": "ȇ",
  "I\\\\": "Ȉ",
  "i\\\\": "ȉ",
  "I)": "Ȋ",
  "i)": "ȋ",
  "O\\\\": "Ȍ",
  "o\\\\": "ȍ",
  "O)": "Ȏ",
  "o)": "ȏ",

  // U+0210
  "R\\\\": "Ȑ",
  "r\\\\": "ȑ",
  "R)": "Ȓ",
  "r)": "ȓ",
  "U\\\\": "Ȕ",
  "u\\\\": "ȕ",
  "U)": "Ȗ",
  "u)": "ȗ",
  "S,": "Ș",
  "s,": "ș",
  "T,": "Ț",
  "t,": "ț",
  JOGH: "Ȝ",
  jogh: "ȝ",
  "H<": "Ȟ",
  "h<": "ȟ",

  // U+0220
  "N long": "Ƞ",
  "d curl": "ȡ",
  OU: "Ȣ",
  ou: "ȣ",
  "Z hook": "Ȥ",
  "z hook": "ȥ",
  "A*": "Ȧ",
  "a*": "ȧ",
  "E,": "Ȩ",
  "e,": "ȩ",
  "O:|": "Ȫ",
  "o:|": "ȫ",
  "O~|": "Ȭ",
  "o~|": "ȭ",
  "O*": "Ȯ",
  "o*": "ȯ",

  // U+0230
  "O*|": "Ȱ",
  "o*|": "ȱ",
  "Y|": "Ȳ",
  "y|": "ȳ",
  "l curl": "ȴ",
  "n curl": "ȵ",
  "t curl": "ȶ",
  "j*": "ȷ",
  db: "ȸ",
  qp: "ȹ",
  "A slash": "Ⱥ",
  "C slash": "Ȼ",
  "c slash": "ȼ",
  "L-": "Ƚ",
  "T slash": "Ⱦ",
  "s swash": "ȿ",

  // U+0240
  "z swash": "ɀ",
  "??": "Ɂ",
  "?": "ɂ",
  "B-": "Ƀ",
  "U-": "Ʉ",
  "V turn": "Ʌ",
  "E slash": "Ɇ",
  "e slash": "ɇ",
  "J-": "Ɉ",
  "j-": "ɉ",
  "Q hook": "Ɋ",
  "q hook": "ɋ",
  "R-": "Ɍ",
  "r-": "ɍ",
  "Y-": "Ɏ",
  "y-": "ɏ",

  // IPA Extensions
  // U+0250
  "a turn": "ɐ",
  //"a back": "ɑ",
  //"a round": "ɒ",
  "b hook": "ɓ",
  "o open": "ɔ",
  "c loop": "ɕ",
  "d tail": "ɖ",
  "d hook": "ɗ",
  "e flip": "ɘ",
  schwa: "ə",
  //"schwa r": "ɚ",
  //"e open flip": "ɛ",
  //"e open": "ɜ",
  //"er open": "ɝ",
  //"": "ɞ",
  "j*-": "ɟ",
  "g hook": "ɠ",
  //"": "ɡ",
  "G small": "ɢ",
  //"c greek": "ɣ",
  //"": "ɤ",
  "h turn": "ɥ",
  "h hook": "ɦ",
  "h hook tail": "ɧ",
  "i-": "ɨ",
  "i greek": "ɩ",
  "I small": "ɪ",
  "l-~": "ɫ",
  //"l belt": "ɬ",
  "l tail": "ɭ",
  lzh: "ɮ",
  "m turn": "ɯ",

  // U+0270
  //"": "ɰ",
  //"": "ɱ",
  //"": "ɲ",
  //"": "ɳ",
  "N small": "ɴ",
  //"": "ɵ",
  oe: "ɶ",
  //"": "ɷ",
  "f greek": "ɸ",
  "r turn": "ɹ",
  //"": "ɺ",
  //"": "ɻ",
  //"": "ɼ",
  //"": "ɽ",
  //"": "ɾ",
  //"": "ɿ",

  // U+0280
  "R small": "ʀ",
  "R small turn": "ʁ",
  //"": "ʂ",
  //"": "ʃ",
  //"": "ʄ",
  //"": "ʅ",
  //"": "ʆ",
  "t turn": "ʇ",
  //"": "ʈ",
  "u-": "ʉ",
  "u greek": "ʊ",
  "v hook": "ʋ",
  "v turn": "ʌ",
  "w turn": "ʍ",
  "y turn": "ʎ",
  "Y small": "ʏ",

  // U+0290
  //"": "ʐ",
  "z loop": "ʑ",
  //"": "ʒ",
  //"": "ʓ",
  //"": "ʔ",
  //"": "ʕ",
  //"": "ʖ",
  //"": "ʗ",
  //"": "ʘ",
  "B small": "ʙ",
  //"": "ʚ",
  //"": "ʛ",
  "H small": "ʜ",
  "j loop": "ʝ",
  "k turn": "ʞ",
  "L small": "ʟ",

  // Phonetic Extensions
  // U+1D00
  "A small": "ᴀ",
  "AE small": "ᴁ",
  "C small": "ᴄ",
  "D small": "ᴅ",
  "D- small": "ᴆ",
  "E small": "ᴇ",
  "J small": "ᴊ",
  "K small": "ᴋ",
  "L slash small": "ᴌ",
  "M small": "ᴍ",
  "N flip small": "ᴎ",
  "O small": "ᴏ",
  "P small": "ᴘ",
  "R turn small": "ᴙ",
  "R flip small": "ᴚ",
  "T small": "ᴛ",
  "U small": "ᴜ",
  "V small": "ᴠ",
  "W small": "ᴡ",
  "Z small": "ᴢ",
  ue: "ᵫ",

  // U+02A0
  //"": "ʠ",
  //"": "ʡ",
  //"": "ʢ",
  dz: "ʣ",
  dzh: "ʤ",
  "dz loop": "ʥ",
  ts: "ʦ",
  tsh: "ʧ",
  "ts loop": "ʨ",
  fng: "ʩ",
  ls: "ʪ",
  lz: "ʫ",
  //"": "ʬ",
  //"": "ʭ",
  //"": "ʮ",
  //"": "ʯ",

  // Latin Extended Additional
  // U+1E00
  "A_@": "Ḁ",
  "a_@": "ḁ",
  "B*": "Ḃ",
  "b*": "ḃ",
  "B_*": "Ḅ",
  "b_*": "ḅ",
  "B_|": "Ḇ",
  "b_|": "ḇ",
  "C/,": "Ḉ",
  "c/,": "ḉ",
  "D*": "Ḋ",
  "d*": "ḋ",
  "D_*": "Ḍ",
  "d_*": "ḍ",
  "D_|": "Ḏ",
  "d_|": "ḏ",

  // U+1E10
  "D,": "Ḑ",
  "d,": "ḑ",
  "D_<": "Ḓ",
  "d_<": "ḓ",
  "E|\\": "Ḕ",
  "e|\\": "ḕ",
  "E|/": "Ḗ",
  "e|/": "ḗ",
  "E_<": "Ḙ",
  "e_<": "ḙ",
  "E_~": "Ḛ",
  "e_~": "ḛ",
  "E(,": "Ḝ",
  "e(,": "ḝ",
  "F*": "Ḟ",
  "f*": "ḟ",

  // U1E20
  "G|": "Ḡ",
  "g|": "ḡ",
  "H*": "Ḣ",
  "h*": "ḣ",
  "H_*": "Ḥ",
  "h_*": "ḥ",
  "H:": "Ḧ",
  "h:": "ḧ",
  "H,": "Ḩ",
  "h,": "ḩ",
  "H_)": "Ḫ",
  "h_)": "ḫ",
  "I_~": "Ḭ",
  "i_~": "ḭ",
  "I:/": "Ḯ",
  "i:/": "ḯ",

  // U+1E30
  "K/": "Ḱ",
  "k/": "ḱ",
  "K_*": "Ḳ",
  "k_*": "ḳ",
  "k_|": "Ḵ",
  "k_|": "ḵ",
  "L_*": "Ḷ",
  "l_*": "ḷ",
  "L|_*": "Ḹ",
  "l|_*": "ḹ",
  "L_|": "Ḻ",
  "l_|": "ḻ",
  "L_<": "Ḽ",
  "l_<": "ḽ",
  "M/": "Ḿ",
  "m/": "ḿ",

  // U+1E40
  "M*": "Ṁ",
  "m*": "ṁ",
  "M_*": "Ṃ",
  "m_*": "ṃ",
  "N*": "Ṅ",
  "n*": "ṅ",
  "N_*": "Ṇ",
  "n_*": "ṇ",
  "N_|": "Ṉ",
  "n_|": "ṉ",
  "N_<": "Ṋ",
  "n_<": "ṋ",
  "O~/": "Ṍ",
  "o~/": "ṍ",
  "O~:": "Ṏ",
  "o~:": "ṏ",

  // U+1E50
  "O|\\": "Ṑ",
  "o|\\": "ṑ",
  "O|/": "Ṓ",
  "o|/": "ṓ",
  "P/": "Ṕ",
  "p/": "ṕ",
  "P*": "Ṗ",
  "p*": "ṗ",
  "R*": "Ṙ",
  "r*": "ṙ",
  "R_*": "Ṛ",
  "r_*": "ṛ",
  "R|_*": "Ṝ",
  "r|_*": "ṝ",
  "R_|": "Ṟ",
  "r_|": "ṟ",

  // U+1E60
  "S*": "Ṡ",
  "s*": "ṡ",
  "S_*": "Ṣ",
  "s_*": "ṣ",
  "S/*": "Ṥ",
  "s/*": "ṥ",
  "S<*": "Ṧ",
  "s<*": "ṧ",
  "S*_*": "Ṩ",
  "s*_*": "ṩ",
  "T*": "Ṫ",
  "t*": "ṫ",
  "T_*": "Ṭ",
  "t_*": "ṭ",
  "T_|": "Ṯ",
  "t_|": "ṯ",

  // U+1E70
  "T_<": "Ṱ",
  "t_<": "ṱ",
  "U_:": "Ṳ",
  "u_:": "ṳ",
  "U_~": "Ṵ",
  "u_~": "ṵ",
  "U_<": "Ṷ",
  "u_<": "ṷ",
  "U~/": "Ṹ",
  "u~/": "ṹ",
  "U|:": "Ṻ",
  "u|:": "ṻ",
  "V~": "Ṽ",
  "v~": "ṽ",
  "V_*": "Ṿ",
  "v_*": "ṿ",

  // U+1E80
  "W\\": "Ẁ",
  "w\\": "ẁ",
  "W/": "Ẃ",
  "w/": "ẃ",
  "W:": "Ẅ",
  "w:": "ẅ",
  "W*": "Ẇ",
  "w*": "ẇ",
  "W_*": "Ẉ",
  "w_*": "ẉ",
  "X*": "Ẋ",
  "x*": "ẋ",
  "X:": "Ẍ",
  "x:": "ẍ",
  "Y*": "Ẏ",
  "y*": "ẏ",

  // U+1E90
  "Z>": "Ẑ",
  "z>": "ẑ",
  "Z_*": "Ẓ",
  "z_*": "ẓ",
  "Z_|": "Ẕ",
  "z_|": "ẕ",
  "h_|": "ẖ",
  "t:": "ẗ",
  "w@": "ẘ",
  "y@": "ẙ",
  //"a": "ẚ",
  "s* long": "ẛ",
  "s long obliq": "ẜ",
  "s- long": "ẝ",
  SZ: "ẞ",
  "d greek": "ẟ",

  // U+1EA0
  "A_*": "Ạ",
  "a_*": "ạ",
  "A?": "Ả",
  "a?": "ả",
  "A>/": "Ấ",
  "a>/": "ấ",
  "A>\\": "Ầ",
  "a>\\": "ầ",
  "A>?": "Ẩ",
  "a>?": "ẩ",
  "A>~": "Ẫ",
  "a>~": "ẫ",
  "A>_*": "Ậ",
  "a>_*": "ậ",
  "A(/": "Ắ",
  "a(/": "ắ",

  // U+1EB0
  "A(\\": "Ằ",
  "a(\\": "ằ",
  "A(?": "Ẳ",
  "a(?": "ẳ",
  "A(~": "Ẵ",
  "a(~": "ẵ",
  "A(_*": "Ặ",
  "a(_*": "ặ",
  "E_*": "Ẹ",
  "e_*": "ẹ",
  "E?": "Ẻ",
  "e?": "ẻ",
  "E~": "Ẽ",
  "e~": "ẽ",
  "E>/": "Ế",
  "e>/": "ế",

  // U+1EC0
  "E>\\": "Ề",
  "e>\\": "ề",
  "E>?": "Ể",
  "e>?": "ể",
  "E>~": "Ễ",
  "e>~": "ễ",
  "E>_*": "Ệ",
  "e>_*": "ệ",
  "I?": "Ỉ",
  "i?": "ỉ",
  "I_*": "Ị",
  "i_*": "ị",
  "O_*": "Ọ",
  "o_*": "ọ",
  "O?": "Ỏ",
  "o?": "ỏ",

  // U+1ED0
  "O>/": "Ố",
  "o>/": "ố",
  "O>\\": "Ồ",
  "o>\\": "ồ",
  "O>?": "Ổ",
  "o>?": "ổ",
  "O>~": "Ỗ",
  "o>~": "ỗ",
  "O>_*": "Ộ",
  "o>_*": "ộ",
  "O'/": "Ớ",
  "o'/": "ớ",
  "O'\\": "Ờ",
  "o'\\": "ờ",
  "O'?": "Ở",
  "o'?": "ở",

  // U+1EE0
  "O'~": "Ỡ",
  "o'~": "ỡ",
  "O'_*": "Ợ",
  "o'_*": "ợ",
  "U_*": "Ụ",
  "u_*": "ụ",
  "U?": "Ủ",
  "u?": "ủ",
  "U'/": "Ứ",
  "u'/": "ứ",
  "U'\\": "Ừ",
  "u'\\": "ừ",
  "U'?": "Ử",
  "u'?": "ử",
  "U'~": "Ữ",
  "u'~": "ữ",

  // U+1EF0
  "U'_*": "Ự",
  "u'_*": "ự",
  "Y\\": "Ỳ",
  "y\\": "ỳ",
  "Y_*": "Ỵ",
  "y_*": "ỵ",
  "Y?": "Ỷ",
  "y?": "ỷ",
  "Y~": "Ỹ",
  "Y~": "ỹ",
  "LL welsh": "Ỻ",
  "ll welsh": "ỻ",
  "V welsh": "Ỽ",
  "v welsh": "ỽ",
  "Y loop": "Ỿ",
  "y loop": "ỿ",

  // Superscripts and Subscripts
  // U+2070
  "0 sup": "⁰",
  "i sup": "ⁱ",
  "4 sup": "⁴",
  "5 sup": "⁵",
  "6 sup": "⁶",
  "7 sup": "⁷",
  "8 sup": "⁸",
  "9 sup": "⁹",
  "+ sup": "⁺",
  "- sup": "⁻",
  "= sup": "⁼",
  "( sup": "⁽",
  ") sup": "⁾",
  "n sup": "ⁿ",

  // U+2080
  "0 sub": "₀",
  "1 sub": "₁",
  "2 sub": "₂",
  "3 sub": "₃",
  "4 sub": "₄",
  "5 sub": "₅",
  "6 sub": "₆",
  "7 sub": "₇",
  "8 sub": "₈",
  "9 sub": "₉",
  "+ sub": "₊",
  "- sub": "₋",
  "= sub": "₌",
  "( sub": "₍",
  ") sub": "₎",

  // U+2090
  "a sub": "ₐ",
  "e sub": "ₑ",
  "o sub": "ₒ",
  "x sub": "ₓ",
  "e turn sub": "ₔ",
  "h sub": "ₕ",
  "k sub": "ₖ",
  "l sub": "ₗ",
  "m sub": "ₘ",
  "n sub": "ₙ",
  "p sub": "ₚ",
  "s sub": "ₛ",
  "t sub": "ₜ",

  // Latin Extended-C
  // U+2C60
  "L--": "Ⱡ",
  "l--": "ⱡ",
  "L-~": "Ɫ",
  "P-": "Ᵽ",
  "R tail": "Ɽ",
  "a slash": "ⱥ",
  "t slash": "ⱦ",
  "H desc": "Ⱨ",
  "h desc": "ⱨ",
  "K desc": "Ⱪ",
  "k desc": "ⱪ",
  "Z desc": "Ⱬ",
  "z desc": "ⱬ",
  "A greek": "Ɑ",
  MG: "Ɱ",
  "A turn": "Ɐ",

  // U+2C70
  "A greek turn": "Ɒ",
  "v hook": "ⱱ",
  "W hook": "Ⱳ",
  "w hook": "ⱳ",
  "v loop": "ⱴ",
  //"": "Ⱶ",
  //"": "ⱶ",
  //"": "ⱷ",
  //"": "ⱸ",
  //"": "ⱹ",
  //"": "ⱺ",
  //"": "ⱻ",
  "j sub": "ⱼ",
  "V sup": "ⱽ",
  "S swash": "Ȿ",
  "Z swash": "Ɀ",

  // Latin Extended-D
  // U+A720
  //"": "꜠",
  //"": "꜡",
  //"": "Ꜣ",
  //"": "ꜣ",
  //"": "Ꜥ",
  //"": "ꜥ",
  //"": "Ꜧ",
  //"": "ꜧ",
  //"": "Ꜩ",
  //"": "ꜩ",
  //"": "Ꜫ",
  //"": "ꜫ",
  //"": "Ꜭ",
  //"": "ꜭ",
  //"": "Ꜯ",
  //"": "ꜯ",

  // U+A730
  "F small": "ꜰ",
  "S small": "ꜱ",
  AA: "Ꜳ",
  aa: "ꜳ",
  AO: "Ꜵ",
  ao: "ꜵ",
  AU: "Ꜷ",
  au: "ꜷ",
  AV: "Ꜹ",
  av: "ꜹ",
  "AV-": "Ꜻ",
  av: "ꜻ",
  AY: "Ꜽ",
  ay: "ꜽ",
  "C* flip": "Ꜿ",
  "c* flip": "ꜿ",

  // U+A740
  "K-": "Ꝁ",
  "k-": "ꝁ",
  //"": "Ꝃ",
  //"": "ꝃ",
  //"": "Ꝅ",
  //"": "ꝅ",
  //"": "Ꝇ",
  //"": "ꝇ",
  "L-": "Ꝉ",
  "l-": "ꝉ",
  //"": "Ꝋ",
  //"": "ꝋ",
  //"": "Ꝍ",
  //"": "ꝍ",
  OO: "Ꝏ",
  oo: "ꝏ",

  // U+A750
  "P-": "Ꝑ",
  "p-": "ꝑ",
  //"": "Ꝓ",
  //"": "ꝓ",
  //"": "Ꝕ",
  //"": "ꝕ",
  "Q-": "Ꝗ",
  "q-": "ꝗ",
  //"": "Ꝙ",
  //"": "ꝙ",
  "R round": "Ꝛ",
  "r round": "ꝛ",
  //"": "Ꝝ",
  //"": "ꝝ",
  "V slash": "Ꝟ",
  "v slash": "ꝟ",

  // U+A760
  WY: "Ꝡ",
  wy: "ꝡ",
  "Z visigoth": "Ꝣ",
  "z visigoth": "ꝣ",
  "TH-": "Ꝥ",
  "th-": "ꝥ",
  "TH_-": "Ꝧ",
  "th_-": "ꝧ",
  //"": "Ꝩ",
  //"": "ꝩ",
  //"": "Ꝫ",
  //"": "ꝫ",
  //"": "Ꝭ",
  //"": "ꝭ",
  //"": "Ꝯ",
  //"": "ꝯ",

  // U+A770
  //"": "ꝰ",
  dum: "ꝱ",
  lum: "ꝲ",
  mum: "ꝳ",
  num: "ꝴ",
  rum: "ꝵ",
  RUM: "ꝶ",
  tum: "ꝷ",
  um: "ꝸ",
  "D insular": "Ꝺ",
  "d insular": "ꝺ",
  "F insular": "Ꝼ",
  "f insular": "ꝼ",
  "G insular": "Ᵹ",
  "G insular turn": "Ꝿ",
  "g insular turn": "ꝿ",
  "L turn": "Ꞁ",
  "l turn": "ꞁ",
  "R insular": "Ꞃ",
  "r insular": "ꞃ",
  "S insular": "Ꞅ",
  "s insular": "ꞅ",
  "T insular": "Ꞇ",
  "t insular": "ꞇ",
  "_<": "ꞈ",
  //"": "꞉",
  //"": "꞊",
  //"": "Ꞌ",
  //"": "ꞌ",
  "H turn": "Ɥ",
  //"": "ꞎ",
  //"": "ꞏ",
  "N desc": "Ꞑ",
  "n desc": "ꞑ",
  "C-": "Ꞓ",
  "c-": "ꞓ",
  //"": "ꞔ",
  //"": "ꞕ",
  //"": "Ꞗ",
  //"": "ꞗ",
  "F-": "Ꞙ",
  "f-": "ꞙ",
  //"": "Ꞛ",
  //"": "ꞛ",
  //"": "Ꞝ",
  //"": "ꞝ",
  //"": "Ꞟ",
  //"": "ꞟ",
  "G obliq": "Ꞡ",
  "g obliq": "ꞡ",
  "K obliq": "Ꞣ",
  "k obliq": "ꞣ",
  "N obliq": "Ꞥ",
  "n obliq": "ꞥ",
  "R obliq": "Ꞧ",
  "r obliq": "ꞧ",
  "S obliq": "Ꞩ",
  "s obliq": "ꞩ",
  "H hook": "Ɦ",
  //"": "Ɜ",
  "g large": "Ɡ",
  //"": "Ɬ",
  "I small capital": "Ɪ",
  "Q small": "ꞯ",
  "K turn": "Ʞ",
  "T turn": "Ʇ",
  "J loop": "Ʝ",
  "X greek": "Ꭓ",
  "B greek": "Ꞵ",
  "b greek": "ꞵ",
  "OO greek": "Ꞷ",
  "oo greek": "ꞷ",
  "U slash": "Ꞹ",
  "u slash": "ꞹ",
  "A glot": "Ꞻ",
  "a glot": "ꞻ",
  "I glot": "Ꞽ",
  "i glot": "ꞽ",
  "U glot": "Ꞿ",
  "u glot": "ꞿ",
  //"": "Ꟁ",
  //"": "ꟁ",
  //"": "Ꟃ",
  //"": "ꟃ",
  //"": "Ꞔ",
  //"": "Ʂ",
  //"": "Ᶎ",
  //"": "Ꟈ",
  //"": "ꟈ",
  "SS-": "Ꟊ",
  "ss-": "ꟊ",
  //"": "Ɤ",
  //"": "Ꟍ",
  //"": "ꟍ",
  //"": "Ꟑ",
  //"": "ꟑ",
  //"": "ꟓ",
  //"": "ꟕ",
  //"": "Ꟗ",
  //"": "ꟗ",
  //"": "Ꟙ",
  //"": "ꟙ",
  //"": "Ꟛ",
  //"": "ꟛ",
  //"": "Ƛ",
  //"C sup": "ꟲ",
  //"F sup": "ꟳ",
  //"Q sup": "ꟴ",
  //"": "Ꟶ",
  //"": "ꟶ",
  //"": "ꟷ",
  "H- sup": "ꟸ",
  "oe sup": "ꟹ",
  //"": "ꟺ",
  "F flip": "ꟻ",
  "P flip": "ꟼ",
  "M turn": "ꟽ",
  "I long": "ꟾ",
  //"": "ꟿ",

  // Latin Extended-E

  // Alphabetic Presentation Forms
  ff: "ﬀ",
  fi: "ﬁ",
  fl: "ﬂ",
  ffi: "ﬃ",
  ffl: "ﬄ",
  "s long t": "ﬅ",
  st: "ﬆ",

  // Latin Extended-F

  // Latin Extended-G
  "k flip": "𝼃",
  "K small flip": "𝼐",
};

require("fs").writeFileSync(
  __filename.replace(/[^\/]+$/, (it) => `../../SumiInput/dicts.bundle/${it}on`),
  JSON.stringify({
    name: "latin",
    dict: valueToSingleton(dict),
  }),
);
