#!/bin/bash
cd ~/sharp/dist

curl -fsSL https://bun.sh/install | bash
sudo ln -s /home/f_politi_m_icoa_it/.bun/bin/bun /usr/bin/bun
/usr/bin/bun --version

mv sharpief __sharpief && tar -xf sharpief-v0.0.97-b637b0c-linux-x64.tar.gz
# add "run.js" into ~/sharp/dist/sharpief/bin/sharpief
chmod +x sharpief/bin/sharpief sharpief/bin/run.js
