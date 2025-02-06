import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listData!: List;

  constructor(private kanbanService: KanbanService) {}

  removeTask(task: Task) {
    this.listData.tasks = this.listData.tasks.filter((t) => t.id !== task.id);
  }

  moveTask(dropEvent: CdkDragDrop<ListComponent>) {
    const { previousContainer, container, previousIndex, currentIndex } =
      dropEvent;
    const isSameContainer = previousContainer.id === container.id;

    isSameContainer
      ? this.kanbanService.reorderTask(
          this.listData.tasks,
          previousIndex,
          currentIndex
        )
      : this.kanbanService.transferTask(
          (previousContainer.data as ListComponent).listData.tasks,
          (container.data as ListComponent).listData.tasks,
          previousIndex,
          currentIndex
        );
  }
}
