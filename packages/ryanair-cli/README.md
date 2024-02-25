oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ryanair
$ ryanair COMMAND
running command...
$ ryanair (--version)
ryanair/0.0.0 linux-x64 node-v20.11.1
$ ryanair --help [COMMAND]
USAGE
  $ ryanair COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ryanair hello PERSON`](#ryanair-hello-person)
* [`ryanair hello world`](#ryanair-hello-world)
* [`ryanair help [COMMANDS]`](#ryanair-help-commands)
* [`ryanair plugins`](#ryanair-plugins)
* [`ryanair plugins:install PLUGIN...`](#ryanair-pluginsinstall-plugin)
* [`ryanair plugins:inspect PLUGIN...`](#ryanair-pluginsinspect-plugin)
* [`ryanair plugins:install PLUGIN...`](#ryanair-pluginsinstall-plugin-1)
* [`ryanair plugins:link PLUGIN`](#ryanair-pluginslink-plugin)
* [`ryanair plugins:uninstall PLUGIN...`](#ryanair-pluginsuninstall-plugin)
* [`ryanair plugins reset`](#ryanair-plugins-reset)
* [`ryanair plugins:uninstall PLUGIN...`](#ryanair-pluginsuninstall-plugin-1)
* [`ryanair plugins:uninstall PLUGIN...`](#ryanair-pluginsuninstall-plugin-2)
* [`ryanair plugins update`](#ryanair-plugins-update)

## `ryanair hello PERSON`

Say hello

```
USAGE
  $ ryanair hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/mrhyde/ryanair/blob/v0.0.0/src/commands/hello/index.ts)_

## `ryanair hello world`

Say hello world

```
USAGE
  $ ryanair hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ ryanair hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/mrhyde/ryanair/blob/v0.0.0/src/commands/hello/world.ts)_

## `ryanair help [COMMANDS]`

Display help for ryanair.

```
USAGE
  $ ryanair help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ryanair.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.12/src/commands/help.ts)_

## `ryanair plugins`

List installed plugins.

```
USAGE
  $ ryanair plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ryanair plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.2/src/commands/plugins/index.ts)_

## `ryanair plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ryanair plugins add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

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
  $ ryanair plugins add

EXAMPLES
  $ ryanair plugins add myplugin 

  $ ryanair plugins add https://github.com/someuser/someplugin

  $ ryanair plugins add someuser/someplugin
```

## `ryanair plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ryanair plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ryanair plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.2/src/commands/plugins/inspect.ts)_

## `ryanair plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ryanair plugins install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

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
  $ ryanair plugins add

EXAMPLES
  $ ryanair plugins install myplugin 

  $ ryanair plugins install https://github.com/someuser/someplugin

  $ ryanair plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.2/src/commands/plugins/install.ts)_

## `ryanair plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ryanair plugins link PLUGIN

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
  $ ryanair plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.2/src/commands/plugins/link.ts)_

## `ryanair plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ryanair plugins remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ryanair plugins unlink
  $ ryanair plugins remove

EXAMPLES
  $ ryanair plugins remove myplugin
```

## `ryanair plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ ryanair plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.2/src/commands/plugins/reset.ts)_

## `ryanair plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ryanair plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ryanair plugins unlink
  $ ryanair plugins remove

EXAMPLES
  $ ryanair plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.2/src/commands/plugins/uninstall.ts)_

## `ryanair plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ryanair plugins unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ryanair plugins unlink
  $ ryanair plugins remove

EXAMPLES
  $ ryanair plugins unlink myplugin
```

## `ryanair plugins update`

Update installed plugins.

```
USAGE
  $ ryanair plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.2.2/src/commands/plugins/update.ts)_
<!-- commandsstop -->
