import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
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
    const authObservable = this.isLogin
      ? this.authService.login({ email, password })
      : this.authService.register({ email, password });

    authObservable.subscribe({
      next: () => this.dialogRef.close(this.authForm.value),
      error: (error) => (this.errorMsg = error?.message || 'Ocurrió un error'),
    });
  }

  private updateFormValidators() {
    if (this.isLogin) {
      this.authForm.get('confirmPassword')?.clearValidators();
      this.authForm.get('confirmPassword')?.setErrors(null);
      this.authForm.get('confirmPassword')?.setValue(null);
      this.errorMsg = '';
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
