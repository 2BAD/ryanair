#!/bin/bash

directory="./build"
files=$(find "$directory" -type f \( -name "*.js" -o -name "*.d.ts" \))

for file in $files; do
  sed -i 's/\.\([^.]*\)\.ts/\.\1.js/g' "$file"
  echo "Replaced extensions in $file"
done
