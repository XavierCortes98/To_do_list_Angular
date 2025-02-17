import { Task } from './task.model';

export interface List {
  id: string;
  title: string;
  tasks: Task[];
}
