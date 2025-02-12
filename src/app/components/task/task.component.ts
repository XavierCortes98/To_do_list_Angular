import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskToRemove: EventEmitter<Task> = new EventEmitter<Task>();

  removeTask() {
    this.taskToRemove.emit(this.task);
  }
}
