import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() boardInfo!: Board;
  @Output() boardDelete: EventEmitter<string> = new EventEmitter<string>();

  deleteBoard() {
    this.boardDelete.emit(this.boardInfo.id);
  }
}
