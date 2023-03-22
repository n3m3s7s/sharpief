#!/bin/bash
binArch=x64
tmpLatestFile=/tmp/sharpief-latest.txt
tmpFile=/tmp/sharpief-latest.tar.gz
installDir=~/sharp/dist
binTarget=/usr/bin/sharpief
curl -o $tmpLatestFile https://raw.githubusercontent.com/n3m3s7s/sharpief/main/releases/latest-${binArch}.txt
name=$(<$tmpLatestFile)
remoteUrl="https://raw.githubusercontent.com/n3m3s7s/sharpief/main/releases/$name"
echo "Downloading remote file $remoteUrl into temporary file $tmpFile"
curl -o $tmpFile $remoteUrl
echo "Installing into $installDir"
if [ -L ${binTarget} ] ; then
  sudo rm $binTarget
fi
if [ -d "$installDir" ]; then
  rm -rf $installDir
fi
mkdir -p $installDir
tar -xf $tmpFile -C $installDir
echo "Linking $installDir/sharpief/bin/sharpief as $binTarget"
sudo ln -s "$installDir/sharpief/bin/sharpief" $binTarget
