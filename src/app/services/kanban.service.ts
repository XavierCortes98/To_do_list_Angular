import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from './task.service';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  constructor(private taskService: TaskService) {}

  reorderTask(list: Task[], fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) {
      return;
    }
    moveItemInArray(list, fromIndex, toIndex);
  }

  transferTask(
    fromList: Task[],
    toList: List,
    fromIndex: number,
    toIndex: number,
    taskId: string
  ) {
    transferArrayItem(fromList, toList.tasks, fromIndex, toIndex);
    this.taskService.moveTask(toList.id, taskId).subscribe();
  }
}
