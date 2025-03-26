# sumi-input

## usage

### states

- text
  - normally input text
- context
  - choose a context (a set of keys and words)
- key(context)
  - choose a key which is converted into a word

### switcher

- `\` text → context, context → text
- `%` context (starts-with) → context (partially-matches)

## generate json

```sh
./make-bundle.sh
```

## run

```sh
pkill SumiInput
rm -rf '~/Library/Input Methods/SumiInput.app'
cp -r '~/Library/Developer/Xcode/DerivedData/SumiInput-<random string>/Build/Products/Debug/SumiInput.app' '~/Library/Input Methods/SumiInput.app'
```

## common symbols

```text
# ◌ nothing
/ Á acute
\ À grave
< Ǎ caron
> Â circumflex
( Ă breve
) Ȃ inverted breve
| Ā macron
: Ä trema, umlaut
~ Ã tilde
* Ȧ dot
@ Å ring
' Ơ horn (vi), psili (el)
, Ą cedille, ogonek
- Đ stroke
%   glottal stop
$   word boundary
_   abbreviation
```

## common latin alphabet usage

```text
c [g]
g [ɣ, (d)ʒ]
h [ɦ]
q [ʔ]
v [w]
w [ɨ]
```

## reference

- [Latin script in Unicode - Wikipedia](https://en.wikipedia.org/wiki/Latin_script_in_Unicode)
- [Greek alphabet - Wikipedia](https://en.wikipedia.org/wiki/Greek_alphabet)
- [Cyrillic script - Wikipedia](https://en.wikipedia.org/wiki/Cyrillic_script)
- [Standard Chinese phonology - Wikipedia](https://en.wikipedia.org/wiki/Standard_Chinese_phonology)
- [Hangul Syllables - Wikipedia](https://en.wikipedia.org/wiki/Hangul_Syllables)
- [Hangul Jamo (Unicode block) - Wikipedia](https://en.wikipedia.org/wiki/Hangul_Jamo_(Unicode_block))
- [Devanagari - Wikipedia](https://en.wikipedia.org/wiki/Devanagari)
- [Armenian alphabet - Wikipedia](https://en.wikipedia.org/wiki/Armenian_alphabet)
- [Classical Armenian - Wikipedia](https://en.wikipedia.org/wiki/Classical_Armenian)
- [Braille ASCII - Wikipedia](https://en.wikipedia.org/wiki/Braille_ASCII)
