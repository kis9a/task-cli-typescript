import { Command, flags } from "@oclif/command";
import { exampleTask } from "../models/exampleTask";
import { Task } from "../models/Task";

const task = new Task(exampleTask);

export default class List extends Command {
  static description = "display tasks";

  static examples = [
    `$ task list

  1   Task One
  2   Task Two
  3   Task Three
  4   Task Four  [completed]
`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    this.parse(List);
    task.getTaskItems().forEach((item) => item.printDetails());
  }
}
