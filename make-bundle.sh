#!/usr/bin/env bash

for ((i=0;i<3;i++)); do
  echo "node $i"
  find 'make-bundle/src' -name '*.js' -not -path "make-bundle/node_modules/**" -exec echo {} \; -exec node {} \;;
done

echo 'prettier'
prettier make-bundle --write
#prettier SumiInput/dicts.bundle --write
