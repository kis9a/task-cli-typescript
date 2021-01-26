task
====

task management cli with typescript, oclif

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/task.svg)](https://npmjs.org/package/task)
[![CircleCI](https://circleci.com/gh/kis9a/task-ts-cli/tree/master.svg?style=shield)](https://circleci.com/gh/kis9a/task-ts-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/task.svg)](https://npmjs.org/package/task)
[![License](https://img.shields.io/npm/l/task.svg)](https://github.com/kis9a/task-ts-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g task-ts-cli
$ task COMMAND
running command...
$ task (-v|--version|version)
task-ts-cli/0.0.0 darwin-x64 node-v15.6.0
$ task --help [COMMAND]
USAGE
  $ task COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`task hello [FILE]`](#task-hello-file)
* [`task help [COMMAND]`](#task-help-command)

## `task hello [FILE]`

describe the command here

```
USAGE
  $ task hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ task hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/kis9a/task-ts-cli/blob/v0.0.0/src/commands/hello.ts)_

## `task help [COMMAND]`

display help for task

```
USAGE
  $ task help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_
<!-- commandsstop -->
