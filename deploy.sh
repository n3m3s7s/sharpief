#!/bin/bash
version=sharpief-v0.0.96-6099b6a-linux-x64
echo "duplicating from tar.gz"
cp "dist/$version.tar.gz" "dist/$version-vanilla.tar.gz"
echo "converting from tar.gz to tar"
gzip -d "dist/$version-vanilla.tar.gz"
echo "removing node binary"
tar -f "dist/$version-vanilla.tar" --delete sharpief/bin/node
echo "removing node modules"
tar -f "dist/$version-vanilla.tar" --delete sharpief/node_modules
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
