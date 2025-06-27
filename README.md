oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g eve
$ sharpief COMMAND
running command...
$ sharpief (--version)
eve/0.0.97 linux-x64 node-v19.9.0
$ sharpief --help [COMMAND]
USAGE
  $ sharpief COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sharpief hello PERSON`](#sharpief-hello-person)
* [`sharpief hello world`](#sharpief-hello-world)
* [`sharpief help [COMMAND]`](#sharpief-help-command)
* [`sharpief plugins`](#sharpief-plugins)
* [`sharpief plugins:install PLUGIN...`](#sharpief-pluginsinstall-plugin)
* [`sharpief plugins:inspect PLUGIN...`](#sharpief-pluginsinspect-plugin)
* [`sharpief plugins:install PLUGIN...`](#sharpief-pluginsinstall-plugin)
* [`sharpief plugins:link PLUGIN`](#sharpief-pluginslink-plugin)
* [`sharpief plugins:uninstall PLUGIN...`](#sharpief-pluginsuninstall-plugin)
* [`sharpief plugins reset`](#sharpief-plugins-reset)
* [`sharpief plugins:uninstall PLUGIN...`](#sharpief-pluginsuninstall-plugin)
* [`sharpief plugins:uninstall PLUGIN...`](#sharpief-pluginsuninstall-plugin)
* [`sharpief plugins update`](#sharpief-plugins-update)
* [`sharpief sharpie INPUT OUTPUT`](#sharpief-sharpie-input-output)

## `sharpief hello PERSON`

Say hello

```
USAGE
  $ sharpief hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/N3m3s7s/eve/blob/v0.0.97/src/commands/hello/index.ts)_

## `sharpief hello world`

Say hello world

```
USAGE
  $ sharpief hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/N3m3s7s/eve/blob/v0.0.97/src/commands/hello/world.ts)_

## `sharpief help [COMMAND]`

Display help for sharpief.

```
USAGE
  $ sharpief help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for sharpief.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `sharpief plugins`

List installed plugins.

```
USAGE
  $ sharpief plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ sharpief plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/index.ts)_

## `sharpief plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ sharpief plugins add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ sharpief plugins add

EXAMPLES
  $ sharpief plugins add myplugin 

  $ sharpief plugins add https://github.com/someuser/someplugin

  $ sharpief plugins add someuser/someplugin
```

## `sharpief plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ sharpief plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ sharpief plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/inspect.ts)_

## `sharpief plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ sharpief plugins install PLUGIN...

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ sharpief plugins add

EXAMPLES
  $ sharpief plugins install myplugin 

  $ sharpief plugins install https://github.com/someuser/someplugin

  $ sharpief plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/install.ts)_

## `sharpief plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ sharpief plugins link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ sharpief plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/link.ts)_

## `sharpief plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sharpief plugins remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sharpief plugins unlink
  $ sharpief plugins remove

EXAMPLES
  $ sharpief plugins remove myplugin
```

## `sharpief plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ sharpief plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/reset.ts)_

## `sharpief plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sharpief plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sharpief plugins unlink
  $ sharpief plugins remove

EXAMPLES
  $ sharpief plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/uninstall.ts)_

## `sharpief plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sharpief plugins unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sharpief plugins unlink
  $ sharpief plugins remove

EXAMPLES
  $ sharpief plugins unlink myplugin
```

## `sharpief plugins update`

Update installed plugins.

```
USAGE
  $ sharpief plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/update.ts)_

## `sharpief sharpie INPUT OUTPUT`

Convert and resize input image to optimized image output

```
USAGE
  $ sharpief sharpie INPUT OUTPUT [-v] [-h] [-q <value>] [-b <value>] [-M <value>] [-t <value>] [-r <value>]
    [-e <value>] [-E <value>] [-a] [-s] [-n] [-g] [-B]

ARGUMENTS
  INPUT   input image file path (source)
  OUTPUT  encoded output image file path (target)

FLAGS
  -B, --removeBg               Try to remove the background from the image
  -E, --extractAfter=<value>   a JSON object to pass manipulations to Sharp.js 'extract' method, AFTER resize
  -M, --median=<value>         Number between 3-5 to apply median filter to the output image. Default: 0 (disabled)
  -a, --animated               Do not remove animation layers
  -b, --blur=<value>           Number between 1-100 to set bluriness of the output image. Default: 0 (disabled)
  -e, --extractBefore=<value>  a JSON object to pass manipulations to Sharp.js 'extract' method, BEFORE resize
  -g, --greyscale              Convert to 8-bit greyscale; 256 shades of grey
  -h, --help                   Show CLI help.
  -n, --normalize              Enhance output image contrast by stretching its luminance to cover the full dynamic range
  -q, --quality=<value>        [default: 60] Number between 1-100 to set quality of the output image. Default: 60
  -r, --resize=<value>         a JSON object to pass manipulations to Sharp.js 'resize' method
  -s, --sharpen                Auto sharp image
  -t, --type=<value>           [default: webp] encoder to use - choose from: jpeg, webp, avif, png and svg
  -v, --version                Show CLI version.

DESCRIPTION
  Convert and resize input image to optimized image output

EXAMPLES
  $ ./bin/dev.js sharpie ./samples/in/1.jpg ./samples/out/1.avif --type avif --quality 50
  Converting file ./samples/in/1.jpg using "avif" encoder with quality 50
  ./bin/dev.js sharpie ./samples/in/2.jpg ./samples/out/2.webp --type webp --quality 70 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'
  ./bin/dev.js sharpie ./samples/in/2.jpg ./samples/out/2after.webp --type webp --quality 70 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}' --extractAfter '{"left": 10, "top": 50, "width": 100, "height": 80}'
  ./bin/dev.js sharpie ./samples/in/2.jpg ./samples/out/2before.webp --type webp --quality 70 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}' --extractBefore '{"left": 10, "top": 50, "width": 600, "height": 800}'
  ./bin/dev.js sharpie ./samples/in/animated.gif ./samples/out/animated.webp --type webp --quality 90 --animated
  ./bin/dev.js sharpie ./samples/in/2.jpg ./samples/out/2sharp.webp --type webp --quality 70 --sharpen --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'
  ./bin/dev.js sharpie ./samples/in/2.jpg ./samples/out/2blur.webp --type webp --quality 20 --blur 10 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'
  ./bin/dev.js sharpie ./samples/in/2.jpg ./samples/out/2normalize.webp --type webp --quality 70 --normalize --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'
  ./bin/dev.js sharpie ./samples/in/rally-car.jpg ./samples/out/rally-car_grey.webp --type webp --quality 70 --greyscale --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'
  ./bin/dev.js sharpie ./samples/in/model.jpg ./samples/out/model_median.webp --type webp --quality 70 --median 3 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'
  ./bin/dev.js sharpie ./samples/in/logo.svg ./samples/out/logo.svg --type svg
  ./bin/dev.js sharpie ./samples/in/person.jpg ./samples/out/person_sc.webp --type webp --quality 70 --resize '{"width": 500, "height": 500, "fit": "crop", "background": "#ffffff"}'
  ./bin/dev.js sharpie ./samples/in/shoe.jpg ./samples/out/shoe_nobg.webp --type webp --quality 70 --removeBg --resize '{"width": 500, "height": 500, "fit": "crop", "background": "#ffffff"}'
  ./bin/dev.js sharpie ./samples/in/test.png ./samples/out/test_ff6600.png --type webp --quality 70 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ff6600"}'
```

_See code: [src/commands/sharpie/index.ts](https://github.com/N3m3s7s/eve/blob/v0.0.97/src/commands/sharpie/index.ts)_
<!-- commandsstop -->
