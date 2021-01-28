import { Command, flags } from "@oclif/command";
import { JsonTask } from "../models/JsonTask";

const task = new JsonTask();

export default class Clean extends Command {
  static description = "remove completed tasks";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    this.parse(Clean);
    task.jsonRemoveComplete();
    task.jsonTaskList();
  }
}
