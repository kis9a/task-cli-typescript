import inquirer from "inquirer";
import { Command, flags } from "@oclif/command";
import { ExampleTask } from "../models/ExampleTask";
import { JsonTask } from "../models/JsonTask";

const task = new JsonTask(ExampleTask);
let showCompleted: boolean = true;

enum Commands {
  Add = "add new task",
  Complete = "mark completed",
  Toggle = "toggle completed",
  Clean = "remove completed",
  Quit = "quit interactive mode",
}

async function promptAdd(): Promise<void> {
  console.clear();
  const answers = await inquirer.prompt({
    type: "input",
    name: "add",
    message: "Enter task",
  });
  if (answers["add"] !== "") {
    task.jsonAddTaskItem(answers["add"]);
  }
  promptUser();
}

async function promptMarkComplete(): Promise<void> {
  console.clear();
  const answers = await inquirer.prompt({
    type: "checkbox",
    name: "complete",
    message: "Mark task complete",
    choices: task.jsonTaskList(showCompleted).map((taskItem) => ({
      name: taskItem.task,
      value: taskItem.id,
      checked: taskItem.complete,
    })),
  });
  let completedTasks = answers["complete"] as number[];
  task
    .jsonTaskList(true)
    .forEach((taskItem) =>
      task.jsonMarkdComplete(
        taskItem.id,
        completedTasks.find((id) => id === taskItem.id) != undefined
      )
    );
  promptUser();
}

function promptPurgeCompleted(): void {
  console.clear();
  task.jsonRemoveComplete();
  promptUser();
}

function promptToggleShowCompleted(): void {
  console.clear();
  showCompleted = !showCompleted;
  promptUser();
}

async function promptUser() {
  console.clear();
  task.jsonTaskList();

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
    case Commands.Clean:
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
