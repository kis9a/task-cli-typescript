import inquirer from 'inquirer'
import {Command, flags} from '@oclif/command'
import {DB} from '../db'

const task = new DB()

let showCompleted = true

const Commands = {
  Add: 'add new task',
  Complete: 'select completed',
  Toggle: 'toggle show completed',
  Clean: 'remove completed',
  Quit: 'quit interactive mode',
} as const

async function promptAdd(): Promise<void> {
  console.clear()
  const answers = await inquirer.prompt({
    type: 'input',
    name: 'add',
    message: 'Enter task',
  })
  if (answers.add !== '') {
    task.jsonAddTaskItem(answers.add)
  }
}

async function promptMarkComplete(): Promise<void> {
  console.clear()
  const answers = await inquirer.prompt({
    type: 'checkbox',
    name: 'complete',
    message: 'Mark task complete',
    choices: task.jsonTaskList(showCompleted).map(taskItem => ({
      name: taskItem.task,
      value: taskItem.id,
      checked: taskItem.complete,
    })),
  })
  const completedTasks = answers.complete as number[]
  task
  .jsonTaskList(showCompleted)
  .forEach(taskItem =>
    task.jsonMarkdComplete(
      taskItem.id,
      completedTasks.find(id => id === taskItem.id) !== undefined
    )
  )
}

async function promptPurgeCompleted(): Promise<void> {
  console.clear()
  task.jsonRemoveTaskItems()
}

async function promptToggleShowCompleted(): Promise<void> {
  console.clear()
  showCompleted = !showCompleted
}

async function promptUser() {
  console.clear()
  task.jsonTaskList(showCompleted)

  const answers = await inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Chose Option',
    choices: Object.values(Commands),
  })

  switch (answers.command) {
  case Commands.Add:
    await promptAdd()
    break
  case Commands.Complete:
    await promptMarkComplete()
    break
  case Commands.Toggle:
    await promptToggleShowCompleted()
    break
  case Commands.Clean:
    await promptPurgeCompleted()
    break
  case Commands.Quit:
    break
  }
  promptUser()
}

export default class Interactive extends Command {
  static description = 'interactive mode'

  static examples = [
    `
$ tstask interactive
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    this.parse(Interactive)
    promptUser()
  }
}
