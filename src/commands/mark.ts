import { Command, flags } from "@oclif/command";
import { DB } from "../db";

const task = new DB();

export default class Mark extends Command {
  static description = "mark completed";

  static examples = [
    `
$tstask mark 1
$tstask mark -c 1 3 -n 4
$tstask mark -t 4 2
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

  static args = [{ name: "taskId", required: true }];

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
