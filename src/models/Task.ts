import chalk from "chalk";

type TaskCounts = {
  total: number;
  incomplete: number;
};

export class TaskItem {
  public constructor(
    public id: number,
    public task: string,
    public complete: boolean = false
  ) {}

  printDetails(): void {
    console.log(
      `${this.id}\t\
        ${chalk.green(`${this.task}`)}\t\
        ${this.complete ? chalk.yellow("\t[completed]") : ""}`
    );
  }
}

export class Task {
  constructor(public taskItems: TaskItem[] = []) {
    taskItems.forEach((item) => this.taskMap.set(item.id, item));
  }
  nextId: number = 1;
  taskMap = new Map<number, TaskItem>();

  getTaskItems(includeComplete: boolean = true): TaskItem[] {
    return [...this.taskMap.values()].filter(
      (taskItem) => includeComplete || !taskItem.complete
    );
  }

  addTaskItem(task: string): number {
    while (this.getTaskById(this.nextId)) {
      this.nextId++;
    }
    this.taskMap.set(this.nextId, new TaskItem(this.nextId, task));
    return this.nextId;
  }

  getTaskById(id: number): TaskItem | undefined {
    return this.taskMap.get(id);
  }

  markComplete(id: number, complete: boolean): void {
    const item = this.getTaskById(id);
    if (item) {
      item.complete = complete;
    }
  }

  toggleMarkComplete(id: number): void {
    const item = this.getTaskById(id);
    if (item) {
      item.complete = !item.complete;
    }
  }

  removeComplete(): void {
    this.taskMap.forEach((taskItem) => {
      if (taskItem.complete) {
        this.taskMap.delete(taskItem.id);
      }
    });
  }

  getTaskComputed(): TaskCounts {
    return {
      total: this.taskMap.size,
      incomplete: this.getTaskItems(false).length,
    };
  }
}
