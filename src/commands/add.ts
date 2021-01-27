import { Command, flags } from "@oclif/command";
import { ExampleTask } from "../models/ExampleTask";
import { JsonTask } from "../models/JsonTask";

const task = new JsonTask(ExampleTask);

export default class Add extends Command {
  static description = "add new task";

  static examples = [
    `$ task add 'New Task'

  1   Task One
  2   Task Two
  3   Task Three
  4   Task Four  [completed]
  5   New Task


$ task add -m 'New Task One' 'New Task Two'

  1   Task One
  2   Task Two
  3   Task Three
  4   Task Four  [completed]
  5   New Task One
  6   New Task Two
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

  static args = [{ name: "task" }];

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
