import { Command, flags } from "@oclif/command";
import { DB } from "../db";

const task = new DB();

export default class Clean extends Command {
  static description = "remove completed tasks";

  static examples = [
  `
$ tstask clean
`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    this.parse(Clean);
    task.jsonRemoveComplete();
    task.jsonTaskList();
  }
}
