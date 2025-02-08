import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() collapsed = new EventEmitter<boolean>();
  showInput = false;
  isCollapsed = false;
  cardTitle = '';

  constructor(private kanbanService: KanbanService) {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsed.emit(this.isCollapsed);
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

  addTask() {
    if (!this.cardTitle.trim()) return;

    this.listData.tasks.push({
      title: this.cardTitle,
    });
    this.cardTitle = '';
    this.toggleShowInput();
  }

  adjustHeight(event: Event): void {
    const element = event.target as HTMLTextAreaElement;
    element.style.height = 'auto'; // Restablece la altura
    element.style.height = `${element.scrollHeight}px`; // Ajusta según el contenido
  }
}
