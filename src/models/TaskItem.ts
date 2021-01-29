import chalk from "chalk";

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
