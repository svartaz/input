#!/usr/bin/env bash

echo 'js'
find 'make-json' -name '*.js' -exec node {} \;

echo 'prettier'
prettier make-json --write
prettier SumiInput/dicts.bundle --write