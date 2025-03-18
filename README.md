# sumi-input

## generate json

```sh
cd make-json
node src/hang
node src/hanz
node src/latn
node src/yue
```

## run

```sh
pkill SumiInput
rm -rf '~/Library/Input Methods/SumiInput.app'
cp -r '~/Library/Developer/Xcode/DerivedData/SumiInput-<random string>/Build/Products/Debug/SumiInput.app' '~/Library/Input Methods/SumiInput.app'
```
