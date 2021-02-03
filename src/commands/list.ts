import {Command, flags} from '@oclif/command'
import {DB} from '../db'

const task = new DB()

export default class List extends Command {
  static description = 'display tasks';

  static examples = [
    `
$ tstask list
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    todo: flags.boolean({
      char: 'd',
      description: 'display exclude completed tasks',
    }),
  };

  async run() {
    const {flags} = this.parse(List)
    if (flags.todo) {
      task.jsonTaskList(false)
    } else {
      task.jsonTaskList()
    }
    this.parse(List)
  }
}
