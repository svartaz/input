#!/usr/bin/env bash

for i in {0..2}; do
  echo "js $i"
  find 'make-bundle' -name '*.js' -not -path "make-bundle/node_modules/**" -exec echo {} \; -exec node {} \;
done

echo 'prettier'
prettier make-bundle --write
prettier SumiInput/dicts.bundle --write