import { Command, flags } from "@oclif/command";
import { JsonTask } from "../models/JsonTask";

const task = new JsonTask();

export default class Add extends Command {
  static description = "add new task";

  static examples = [
    `
$ task add 'New Task'
$ task add -m 'New Task One' 'New Task Two'
`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    multiple: flags.string({
      char: "m",
      description: "multiple arguments",
      multiple: true,
    }),
  };

  static args = [{ name: "task", required: true }];

  async run() {
    const { args, flags } = this.parse(Add);
    if (args.task) {
      task.jsonAddTaskItem(args.task);
    }
    if (flags.multiple) {
      flags.multiple.forEach((item) => {
        task.jsonAddTaskItem(item);
      });
    }
    task.jsonTaskList();
  }
}
