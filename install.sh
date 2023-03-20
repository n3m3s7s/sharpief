#!/bin/bash
mkdir -p /var/www/sharp/dist
tar -xf dist/sharpief-v0.0.87-66c0ab6-linux-x64.tar.gz -C /var/www/sharp/dist
ln -s /var/www/sharp/dist/sharpief/bin/sharpief /usr/bin/sharpief
chown -R sail:sail /var/www/sharp/dist
