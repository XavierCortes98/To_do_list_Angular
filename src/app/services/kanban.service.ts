import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  constructor() {}

  reorderTask(list: Task[], fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) {
      return;
    }
    moveItemInArray(list, fromIndex, toIndex);
  }

  transferTask(
    fromList: Task[],
    toList: Task[],
    fromIndex: number,
    toIndex: number
  ) {
    transferArrayItem(fromList, toList, fromIndex, toIndex);
  }
}
