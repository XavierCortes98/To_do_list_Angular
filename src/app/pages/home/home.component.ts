import { boardsExample } from './board-example';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  boardList = boardsExample;

  newBoardForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newBoardForm = this.fb.group({
      title: ['', Validators.required],
      // img: ['', Validators.required],
    });
  }
}
