#!/bin/bash
version=sharpief-v0.0.97-b637b0c-linux-x64
echo "duplicating from tar.gz"
cp "dist/$version.tar.gz" "dist/$version-vanilla.tar.gz"
echo "converting from tar.gz to tar"
gzip -d "dist/$version-vanilla.tar.gz"
echo "removing node binary"
tar -f "dist/$version-vanilla.tar" --delete sharpief/bin/node sharpief/bin/run.js sharpief/bin/sharpief
#echo "removing node modules"
#tar -f "dist/$version-vanilla.tar" --delete sharpief/node_modules
echo "adding bun compatible files"
tar -uvf "dist/$version-vanilla.tar" sharpief/bin
echo "encoding in gzip"
gzip -9 "dist/$version-vanilla.tar"
echo "copying to releases"
rm releases/*.tar.gz
cp "dist/$version-vanilla.tar.gz" "releases/"
cp "dist/$version-vanilla.tar.gz" "releases/$version.tar.gz"
echo "writing txt files"
echo "$version-vanilla.tar.gz" > releases/latest-vanilla.txt
echo "$version.tar.gz" > releases/latest-x64.txt
echo "DONE"
