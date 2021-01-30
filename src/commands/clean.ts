import { Command, flags } from "@oclif/command";
import { DB } from "../db";

const task = new DB();

export default class Clean extends Command {
  static description = "remove completed tasks";

  static examples = [
    `
$ tstask clean
$ tstask clean all
`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "option", required: true }];

  async run() {
    const { args } = this.parse(Clean);

    if (args.option === "all") {
      task.jsonRemoveTaskItems(false);
    } else {
      task.jsonRemoveTaskItems();
    }
    task.jsonTaskList();
  }
}
