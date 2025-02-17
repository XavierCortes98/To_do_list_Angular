import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, user, { withCredentials: true })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          if (response.token) this.tokenService.saveToken(response.token);
        })
      );
  }

  refreshToken(): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          if (response.token) this.tokenService.saveToken(response.token);
        })
      );
  }

  register(user: User) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/register`, user)
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          if (response.token) {
            this.tokenService.saveToken(response.token);
          }
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return this.tokenService.isAuthenticated();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';

    if (error.error?.message) {
      errorMessage = error.error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}
