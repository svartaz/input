#!/usr/bin/env bash

echo "node"
find 'make-bundle/src' -name '*.js' -not -path "make-bundle/node_modules/**" -exec echo {} \; -exec node {} \;

echo 'prettier'
prettier make-bundle --write
#prettier SumiInput/dicts.bundle --write
