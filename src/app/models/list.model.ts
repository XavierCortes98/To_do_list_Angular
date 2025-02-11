import { Task } from './task.model';

export class List {
  id: string;
  title: string;
  order?: number;
  color: string;
  isArchived: boolean;
  tasks: Task[];

  constructor(
    id: string,
    title: string,
    order: number,
    tasks: Task[],
    color: string,
    archived: boolean
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.tasks = tasks;
    this.color = color;
    this.isArchived = archived;
  }
}
