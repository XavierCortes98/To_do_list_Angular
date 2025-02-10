import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent implements OnInit {
  newBoardForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewBoardComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newBoardForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.newBoardForm.valid) {
      this.dialogRef.close(this.newBoardForm.value);
    }
  }
}
