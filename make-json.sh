find . -name 'make-json/src/*.js' -exec node {} \;
prettier make-json --write
prettier SumiInput/dicts.bundle --write