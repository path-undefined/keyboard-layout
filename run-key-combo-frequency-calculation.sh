#!/usr/bin/env bash

for LANG in english chinese german
do
  node character-frequencies.js \
    ./${LANG}-key-combo-frequency/${LANG}-word-frequency-list.txt \
    > ./${LANG}-key-combo-frequency/${LANG}-key-combo-frequency.json

  node frequency-percentage.js \
    ./${LANG}-key-combo-frequency/${LANG}-key-combo-frequency.json \
    > ./${LANG}-key-combo-frequency/${LANG}-key-combo-frequency-unified.json
done

node merge-unified-frequency.js \
  ./chinese-key-combo-frequency/chinese-key-combo-frequency-unified.json 2 \
  ./english-key-combo-frequency/english-key-combo-frequency-unified.json 3 \
  ./german-key-combo-frequency/german-key-combo-frequency-unified.json 1 \
  > merged-key-combo-frequency-unified.json 
