import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { KanbanService } from 'src/app/services/kanban.service';
import { ListService } from 'src/app/services/list.service';
import { TaskService } from '../../services/task.service';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listData!: List;

  @Output() removeListId = new EventEmitter<string>();
  @Output() collapsed = new EventEmitter<boolean>();

  showInputTitle = false;
  showInput = false;

  isCollapsed = false;
  cardTitle = '';

  constructor(
    private kanbanService: KanbanService,
    private taskService: TaskService,
    private listService: ListService
  ) {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    if (this.showInputTitle) this.toggleRenameInput();
  }

  toggleRenameInput() {
    this.showInputTitle = !this.showInputTitle;

    if (this.showInputTitle) this.cardTitle = this.listData.title;
    if (!this.showInputTitle && this.cardTitle.length > 0) {
      this.listData.title = this.cardTitle;
      this.listService
        .updateListName(this.listData.title, this.listData.id)
        .subscribe();
      this.cardTitle = '';
    }
  }

  toggleShowInput(resetTitle = false) {
    this.showInput = !this.showInput;
    if (resetTitle) this.cardTitle = '';
  }

  openInput(event: Event) {
    event.stopPropagation();
    this.toggleShowInput();
  }

  onClickOutside() {
    if (this.showInput && this.cardTitle.length <= 0)
      this.toggleShowInput(true);
  }

  removeList() {
    this.removeListId.emit(this.listData.id);
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task.id!).subscribe();
    this.listData.tasks = this.listData.tasks.filter((t) => t.id !== task.id);
  }

  moveTask(dropEvent: CdkDragDrop<ListComponent>) {
    const { previousContainer, container, previousIndex, currentIndex } =
      dropEvent;
    const isSameContainer = previousContainer.id === container.id;

    const movedTask = dropEvent.item.data;
    isSameContainer
      ? this.kanbanService.reorderTask(
          this.listData.tasks,
          previousIndex,
          currentIndex
        )
      : this.kanbanService.transferTask(
          (previousContainer.data as ListComponent).listData.tasks,
          (container.data as ListComponent).listData,
          previousIndex,
          currentIndex,
          movedTask.id
        );
  }

  addTask() {
    if (!this.cardTitle.trim()) return;

    this.taskService
      .postTask(this.cardTitle, this.listData.id)
      .subscribe((response) => {
        this.listData.tasks.push(response.newTask);
      });
    this.cardTitle = '';
    this.toggleShowInput();
  }

  adjustHeight(event: Event): void {
    const element = event.target as HTMLTextAreaElement;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }
}
