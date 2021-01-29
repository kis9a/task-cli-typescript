import chalk from "chalk";
import { TypeTaskItem } from './Task'

export type TypeProjectItem = {
  id: number,
  name: string,
  isCurrent: boolean,
  isArchive: boolean
  tasks: TypeTaskItem
}

export class ProjectItem {
  public constructor(
    public id: number,
    public name: string,
    public isCurrent: boolean = false,
    public isArchive: boolean = false
  ) {}

  printDetails(): void {
    console.log(
      "hello"
      // `${this.id}\t\
      //   ${chalk.green(`${this.task}`)}\t\
      //   ${this.complete ? chalk.yellow("\t[completed]") : ""}`
    );
  }
}

export class Project {
  constructor(public projectItems: ProjectItem[] = []) {
    projectItems.forEach((item) => this.projectMap.set(item.id, item));
  }
  private nextId: number = 1;
  projectMap = new Map<number, ProjectItem>();

  getProjectItems(includeArchive: boolean = true): ProjectItem[] {
    return [...this.projectMap.values()].filter((item) => includeArchive || !item.isArchive);
  }
}
