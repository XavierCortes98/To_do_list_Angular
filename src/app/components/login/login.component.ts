import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin = true;
  authForm!: FormGroup;
  errorMsg = '';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );
    this.updateFormValidators();
  }

  passwordMatchValidator(
    form: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (!confirmPassword) return null;
    return password === confirmPassword ? null : { notMatching: true };
  }

  switchMode() {
    this.isLogin = !this.isLogin;
    this.updateFormValidators();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;

    this.authService
      .login({
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          console.log('exito');
        },
        error: (error) => {
          console.error('error:', error);
          this.errorMsg = error;
        },
      });

    this.dialogRef.close(this.authForm.value);
  }

  private updateFormValidators() {
    if (this.isLogin) {
      this.authForm.get('confirmPassword')?.clearValidators();
      this.authForm.get('confirmPassword')?.setErrors(null);
    } else {
      this.authForm
        .get('confirmPassword')
        ?.setValidators([Validators.required]);
    }
    this.authForm.updateValueAndValidity();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
