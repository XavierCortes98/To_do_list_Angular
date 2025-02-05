import { Component, Input } from '@angular/core';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listData!: List;
}
