import { Command, flags } from "@oclif/command";
import { JsonTask } from "../models/JsonTask";

const task = new JsonTask();

export default class List extends Command {
  static description = "display tasks";

  static examples = [
  `
$ task list
`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    todo: flags.boolean({
      char: "d",
      description: "display exclude completed tasks",
    }),
  };

  async run() {
    const { flags } = this.parse(List);
    if(flags.todo) {
      task.jsonTaskList(false);
    } else {
      task.jsonTaskList();
    }
    this.parse(List);
  }
}
