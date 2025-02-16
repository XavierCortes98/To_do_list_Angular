import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardComponent } from 'src/app/components/new-board/new-board.component';
import { AuthService } from 'src/app/services/auth.service';
import { Board } from 'src/app/models/board.model';
import { BoardService } from 'src/app/services/board.service';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  boardList: Board[] = [];
  newBoardForm: FormGroup = this.fb.group({});

  isLogged = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();

    this.boardService.getBoards().subscribe((boards) => {
      this.boardList = boards;
    });

    this.newBoardForm = this.fb.group({
      title: ['', Validators.required],
      // img: ['', Validators.required],
    });
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.authService.login(result).subscribe((success) => {
        if (success) {
          this.isLogged = this.authService.isLogged();
          this.loadBoards();
        }
      });
    });
  }

  private loadBoards(): void {
    this.boardService.getBoards().subscribe((boards) => {
      this.boardList = boards;
    });
  }

  openBoardModal(): void {
    const dialogRef = this.dialog.open(NewBoardComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardList.push({
          id: result.newBoard.id,
          title: result.newBoard.title,
        });
      }
    });
  }

  deleteBoard(boardId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.deleteBoard(boardId).subscribe(() => {
          this.boardList = this.boardList.filter(
            (board) => board.id !== boardId
          );
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLogged = this.authService.isLogged();
    this.boardList = [];
  }
}
