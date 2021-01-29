import lowdb from "lowdb";
import { Task, TaskItem } from "./models/Task";
// import { Proect, ProjectItem } from "./models/Project";
import FileSync from "lowdb/adapters/FileSync";

type ProjectItem = {
    id: number;
    name: string;
    isCurrent: boolean;
    isArchive: boolean;
    tasks: TaskItem[];
}

type schemaType = {
  projects: ProjectItem[];
};

export class DbTask extends Task {
  private database: lowdb.LowdbSync<schemaType>;
  constructor(project: string = "projects", taskItems: TaskItem[] = []) {
    super([]);
    const projectMap = new Map<number, ProjectItem>();

    this.database = lowdb(new FileSync("db/task.db"));
    if (this.database.has("project").value()) {
      let dbItems = this.database.get("projects").value();
      dbItems.forEach((taskItem) => {
        // this.taskMap.set(
        //   taskItem.id,
        //   new TaskItem(taskItem.id, taskItem.task, taskItem.complete)
        // );
      });
    } else {
      this.database.set(project, taskItems).write();
      taskItems.forEach((taskItem) => this.taskMap.set(taskItem.id, taskItem));
    }
  }

  dbAddTaskItem(task: string): void {
    super.addTaskItem(task);
    this.storeTasks();
  }

  dbMarkdComplete(id: number, complete: boolean): void {
    super.markComplete(id, complete);
    this.storeTasks();
  }

  dbToggleMarkComplete(id: number): void {
    super.toggleMarkComplete(id);
    this.storeTasks();
  }

  dbRemoveComplete(): void {
    super.removeComplete();
    this.storeTasks();
  }

  dbTaskList(
    includeComplete: boolean = true,
    showComputed: boolean = true
  ): TaskItem[] {
    if (showComputed) {
      this.printTaskComputed();
    }
    const taskItems = super.getTaskItems(includeComplete);
    taskItems.forEach((item) => item.printDetails());
    return taskItems;
  }

  printTaskComputed(): void {
    const total = super.getTaskComputed().total;
    const incomplete = super.getTaskComputed().incomplete;
    console.log(`${total} tasks, ${incomplete} tasks todo.\n`);
  }

  storeTasks(project: string = "default"): void {
    this.database.set(project, [...this.taskMap.values()]).write();
  }
}
