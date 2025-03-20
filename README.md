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
./make-json.sh
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
' Ơ horn (vi), psili (el)
, Ą cedille, ogonek
- Đ stroke
```
