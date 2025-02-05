import { Component } from '@angular/core';
import { listsExample } from './list-example';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss'],
})
export class BoardDetailComponent {
  lists = listsExample;
}
