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
  listTitle: string = '';
  boardId!: string;
  showInput = false;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('boardId')!;
    this.listService.getLists(this.boardId).subscribe((lists) => {
      this.lists = lists;
    });
  }

  addList() {
    if (!this.listTitle.trim()) return;
    this.listService
      .postList(this.listTitle, this.boardId)
      .subscribe((response) => {
        this.lists.push({
          id: response.newList.id,
          title: response.newList.title,
          tasks: [],
        });
      });

    this.clearTitle();
  }

  removeList(listId: string) {
    this.listService.removeList(listId).subscribe((response) => {
      this.lists = this.lists.filter(
        (list) => !response.deletedList.includes(list.id)
      );
    });
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
