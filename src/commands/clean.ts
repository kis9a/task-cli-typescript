import { Command, flags } from "@oclif/command";
import { exampleTask } from "../models/exampleTask";
import { Task } from "../models/Task";

const task = new Task(exampleTask);

export default class Clean extends Command {
  static description = "remove completed tasks";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    this.parse(Clean);
    task.removeComplete();
    task.getTaskItems().forEach((item) => item.printDetails());
  }
}
