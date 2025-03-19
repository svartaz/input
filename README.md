# sumi-input

## generate json

```sh
sh make-json.sh
```

## run

```sh
pkill SumiInput
rm -rf '~/Library/Input Methods/SumiInput.app'
cp -r '~/Library/Developer/Xcode/DerivedData/SumiInput-<random string>/Build/Products/Debug/SumiInput.app' '~/Library/Input Methods/SumiInput.app'
```
