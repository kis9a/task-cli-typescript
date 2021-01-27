import { Command, flags } from "@oclif/command";
import { ExampleTask } from "../models/ExampleTask";
import { JsonTask } from "../models/JsonTask";

const task = new JsonTask(ExampleTask);

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
