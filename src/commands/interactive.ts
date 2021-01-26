import { Command, flags } from "@oclif/command";
import { exampleTask } from "../models/exampleTask";
import { Task } from "../models/Task";
import inquirer from "inquirer";

const task = new Task(exampleTask);
let showCompleted: boolean = true;

function displayTaskList(): void {
  task.getTaskItems(showCompleted).forEach((item) => item.printDetails());
}

enum Commands {
  Add = "Add New Task",
  Complete = "Mark Complete Task",
  Toggle = "Show/Hide Completed",
  Purge = "Remove Complete Tasks",
  Quit = "Quit",
}

async function promptAdd(): Promise<void> {
  console.clear();
  const answers = await inquirer.prompt({
    type: "input",
    name: "add",
    message: "Enter task",
  });
  if (answers["add"] !== "") {
    task.addTaskItem(answers["add"]);
  }
  promptUser();
}

async function promptMarkComplete(): Promise<void> {
  console.clear();
  const answers = await inquirer.prompt({
    type: "checkbox",
    name: "complete",
    message: "Mark task complete",
    choices: task.getTaskItems(showCompleted).map((taskItem) => ({
      name: taskItem.task,
      value: taskItem.id,
      checked: taskItem.complete,
    })),
  });
  let completedTasks = answers["complete"] as number[];
  task
    .getTaskItems(true)
    .forEach((taskItem) =>
      task.markComplete(
        taskItem.id,
        completedTasks.find((id) => id === taskItem.id) != undefined
      )
    );
  promptUser();
}

function promptPurgeCompleted(): void {
  console.clear();
  task.removeComplete();
  promptUser();
}

function promptToggleShowCompleted(): void {
  console.clear();
  showCompleted = !showCompleted;
  promptUser();
}

async function promptUser() {
  console.clear();
  displayTaskList();

  const answers = await inquirer.prompt({
    type: "list",
    name: "command",
    message: "Chose Option",
    choices: Object.values(Commands),
  });

  switch (answers["command"]) {
    case Commands.Add:
      promptAdd();
      break;
    case Commands.Complete:
      promptMarkComplete();
      break;
    case Commands.Toggle:
      promptToggleShowCompleted();
      break;
    case Commands.Purge:
      promptPurgeCompleted();
      break;
    case Commands.Quit:
      break;
  }
}

export default class Interactive extends Command {
  static description = "interactive mode";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    this.parse(Interactive);
    promptUser();
  }
}
