import { Command, flags } from "@oclif/command";
import { ExampleTask } from "../models/ExampleTask";
import { JsonTask } from "../models/JsonTask";

const task = new JsonTask(ExampleTask);

export default class Mark extends Command {
  static description = "mark completed";

  static examples = [
    `
$task list
  1   Task One
  2   Task Two
  3   Task Three
  4   Task Four   [completed]

---

$task mark 1
  1   Task One    [completed]
  2   Task Two
  3   Task Three
  4   Task Four   [completed]

$task mark -c 1 3 -n 4
  1   Task One    [completed]
  2   Task Two
  3   Task Three  [completed]
  4   Task Four

$task mark -t 4 2
  1   Task One
  2   Task Two    [completed]
  3   Task Three
  4   Task Four
`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    complete: flags.integer({
      char: "c",
      description: "mark completed",
      multiple: true,
    }),
    do: flags.integer({
      char: "d",
      description: "remove completed",
      multiple: true,
    }),
    toggle: flags.integer({
      char: "t",
      description: "toggle completed",
      multiple: true,
    }),
  };

  static args = [{ name: "taskId" }];

  async run() {
    const { args, flags } = this.parse(Mark);
    const taskId: number = Number(args.taskId);

    if (typeof taskId === "number") {
      task.jsonMarkdComplete(taskId, true);
    }

    if (flags.complete) {
      flags.complete.forEach((item) => {
        let taskId: number = Number(item);
        if (typeof taskId === "number") {
          task.jsonMarkdComplete(taskId, true);
        }
      });
    }

    if (flags.do) {
      flags.do.forEach((item) => {
        let taskId: number = Number(item);
        if (typeof taskId === "number") {
          task.jsonMarkdComplete(taskId, false);
        }
      });
    }

    if (flags.toggle) {
      flags.toggle.forEach((item) => {
        let taskId: number = Number(item);
        if (typeof taskId === "number") {
          task.jsonToggleMarkComplete(taskId);
        }
      });
    }

    task.jsonTaskList();
  }
}
