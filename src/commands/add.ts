import {Command, flags} from '@oclif/command'
import {DB} from '../db'

const task = new DB()

export default class Add extends Command {
  static description = 'add new task'

  static examples = [
    `
$ tstask add 'New Task'
$ tstask add -m 'New Task One' 'New Task Two'
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    multiple: flags.string({
      char: 'm',
      description: 'multiple arguments',
      multiple: true,
    }),
  }

  static args = [{name: 'task', required: true}]

  async run() {
    this.log('hello, world!')

    const {args, flags} = this.parse(Add)
    if (args.task) {
      task.jsonAddTaskItem(args.task)
    }
    if (flags.multiple) {
      flags.multiple.forEach(item => {
        task.jsonAddTaskItem(item)
      })
    }
    task.jsonTaskList()
  }
}
