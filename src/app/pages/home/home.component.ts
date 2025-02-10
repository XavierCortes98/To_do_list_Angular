import { boardsExample } from './board-example';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardComponent } from 'src/app/compontents/new-board/new-board.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  boardList = boardsExample;

  newBoardForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.newBoardForm = this.fb.group({
      title: ['', Validators.required],
      // img: ['', Validators.required],
    });
  }

  openBoardModal(): void {
    const dialogRef = this.dialog.open(NewBoardComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nuevo tablero:', result);
        this.boardList.push({
          name: result.title,
          image: 'abc',
          isFavorite: false,
        });
      }
    });
  }

  register() {
    this.authService
      .login({
        email: 'b@gmail.com',
        password: '123456',
      })
      .subscribe((a) => console.log(a));
  }
}
