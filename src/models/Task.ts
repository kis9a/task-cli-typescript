import { TaskItem } from './TaskItem'

export class Task {
  constructor(
    public taskItems: TaskItem[] = []
  ) { 
    taskItems.forEach((item) => this.taskMap.set(item.id, item));
  }
  taskMap = new Map<number, TaskItem>();

  getTaskItems(): TaskItem[] {
    return [...this.taskMap.values()]
  }
}
