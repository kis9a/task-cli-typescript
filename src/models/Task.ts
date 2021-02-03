import chalk from 'chalk'

type TaskCounts = {
  total: number;
  incomplete: number;
}

export class TaskItem {
  public constructor(
    public id: number,
    public task: string,
    public complete: boolean = false
  ) {}

  printDetails(): void {
    console.log(
      `${chalk.red(`${this.id}`)}\t ${this.complete ? '✅' : ''}\t\
        ${chalk.green(`${this.task}`)}`
    )
  }
}

export class Task {
  constructor(public taskItems: TaskItem[] = []) {
    taskItems.forEach(item => this.taskMap.set(item.id, item))
  }

  nextId = 1

  taskMap = new Map<number, TaskItem>()

  getTaskItems(includeCompleted = true): TaskItem[] {
    return [...this.taskMap.values()].filter(
      taskItem => includeCompleted || !taskItem.complete
    )
  }

  removeTaskItems(onlyCompleted = true): void {
    if (onlyCompleted) {
      this.taskMap.forEach(taskItem => {
        if (taskItem.complete) {
          this.taskMap.delete(taskItem.id)
        }
      })
    } else {
      this.taskMap.clear()
    }
  }

  addTaskItem(task: string): number {
    while (this.getTaskById(this.nextId)) {
      this.nextId++
    }
    this.taskMap.set(this.nextId, new TaskItem(this.nextId, task))
    return this.nextId
  }

  getTaskById(id: number): TaskItem | undefined {
    return this.taskMap.get(id)
  }

  markComplete(id: number, complete: boolean): void {
    const item = this.getTaskById(id)
    if (item) {
      item.complete = complete
    }
  }

  toggleMarkComplete(id: number): void {
    const item = this.getTaskById(id)
    if (item) {
      item.complete = !item.complete
    }
  }

  getTaskComputed(): TaskCounts {
    return {
      total: this.taskMap.size,
      incomplete: this.getTaskItems(false).length,
    }
  }
}
