tstask
====

<!-- toc -->
* [Installation](#usage)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Installation
git clone https://github.com/kis9a/tstask  
yarn && yarn link

# Usage

### Commands
<!-- commands -->
* [`tstask list`](#task-list)
* [`tstask add [TASK]`](#task-add-task)
* [`tstask mark [TASKID]`](#task-mark-task)
* [`tstask clean`](#task-clean)
* [`tstask interactive`](#task-interactive)
* [`tstask help [COMMAND]`](#task-help-command)

- [ ] get project list tstask project (list|add|remove|switch)
- [ ] get project progress
- [ ] add project to task 'default' | 'secret' | ''
- [ ] switch project current $tstask project


{
project: [
  {
    id: number,
    name: string,
    isCurrent: boolean,
    isArchive: boolean
  },
  {
    id: number,
    name: string,
    isCurrent: boolean,
    isArchive: boolean
  }
]

}

### Command examples

tstask project 'add' ''
tstask project 'archive' ''
tstask project 'list' 'all' ''
tstask project 'remove' 1 
tstask project switch '1'
