import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() boardInfo!: Board;

  toggleFav() {
    this.boardInfo.isFavorite = !this.boardInfo.isFavorite;
  }
}
