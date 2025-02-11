import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss'],
})
export class BoardDetailComponent implements OnInit {
  lists!: List[];
  boardId!: string;
  showInput = false;
  listTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('boardId')!;
    this.listService.getBoards(this.boardId).subscribe((lists) => {
      this.lists = lists;
    });
  }

  addList() {
    if (!this.listTitle.trim()) return;

    this.lists.push({
      id: '',
      title: this.listTitle,
      color: 'gray',
      isArchived: false,
      tasks: [],
    });
    this.clearTitle();
  }

  openInput(event: Event) {
    event.stopPropagation();
    this.toggleInput();
  }

  onClickOutside() {
    if (this.showInput && this.listTitle.length <= 0) this.toggleInput();
  }

  toggleInput() {
    this.showInput = !this.showInput;
    if (!this.showInput) {
      this.clearTitle();
    }
  }

  clearTitle() {
    this.listTitle = '';
  }
}
