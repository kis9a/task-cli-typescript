import lowdb from "lowdb";
import { Task } from "./Task";
import { TaskItem } from "./TaskItem";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  tasks: {
    id: number;
    task: string;
    complete: boolean;
  }[];
};

export class JsonTask extends Task {
  private database: lowdb.LowdbSync<schemaType>;

  constructor(taskItems: TaskItem[] = []) {
    super([]);
    this.database = lowdb(new FileSync("task.json"));
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

  jsonTaskList(includeComplete: boolean = true): TaskItem[] {
    const taskItems = super.getTaskItems(includeComplete);
    taskItems.forEach((item) => item.printDetails());
    return taskItems;
  }

  storeTasks() {
    this.database.set("tasks", [...this.taskMap.values()]).write();
  }
}
