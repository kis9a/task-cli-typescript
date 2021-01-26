import { TaskItem } from './TaskItem'

export class Task {
  constructor(
    public taskItems: TaskItem[] = []
  ) { 
    taskItems.forEach((item) => this.taskMap.set(item.id, item));
  }
  nextId: number = 1;
  taskMap = new Map<number, TaskItem>();

  getTaskItems(): TaskItem[] {
    return [...this.taskMap.values()]
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
}
