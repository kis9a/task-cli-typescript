import lowdb from "lowdb";
import { Task, TaskItem } from "./models/Task";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  tasks: {
    id: number;
    task: string;
    complete: boolean;
  }[];
};

export class DB extends Task {
  private database: lowdb.LowdbSync<schemaType>;

  constructor(taskItems: TaskItem[] = []) {
    super([]);
    this.database = lowdb(new FileSync("db/task.json"));
    if (this.database.has("tasks").value()) {
      let dbItems = this.database.get("tasks").value();
      dbItems.forEach((taskItem) => {
        this.taskMap.set(
          taskItem.id,
          new TaskItem(taskItem.id, taskItem.task, taskItem.complete)
        );
      });
    } else {
      this.database.set("tasks", taskItems).write();
      taskItems.forEach((taskItem) => this.taskMap.set(taskItem.id, taskItem));
    }
  }

  jsonAddTaskItem(task: string): void {
    super.addTaskItem(task);
    this.storeTasks();
  }

  jsonMarkdComplete(id: number, complete: boolean): void {
    super.markComplete(id, complete);
    this.storeTasks();
  }

  jsonToggleMarkComplete(id: number): void {
    super.toggleMarkComplete(id);
    this.storeTasks();
  }

  jsonRemoveComplete(): void {
    super.removeComplete();
    this.storeTasks();
  }

  jsonTaskList(
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

  storeTasks(): void {
    this.database.set("tasks", [...this.taskMap.values()]).write();
  }
}
