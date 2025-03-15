# sumi-input

## generate json

```
node make-json/src/hanz
node make-json/src/yue
```

## run

```
pkill SumiInput \
&& rm -rf '~/Library/Input Methods/SumiInput.app' \
&& cp -r '~/Library/Developer/Xcode/DerivedData/SumiInput-<random string>/Build/Products/Debug/SumiInput.app' '~/Library/Input Methods/SumiInput.app'
```
