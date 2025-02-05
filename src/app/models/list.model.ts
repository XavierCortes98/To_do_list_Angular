import { Task } from './task.model';

export class List {
  title: string;
  description: string;
  createdDate: Date;
  dueDate?: Date;
  order?: number;
  color: string;
  isArchived: boolean;
  id: string;
  tasks: Task[];

  constructor(
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    order: number,
    tasks: Task[],
    color: string,
    archived: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdDate = createdAt;
    this.order = order;
    this.tasks = tasks;
    this.color = color;
    this.isArchived = archived;
  }
}
