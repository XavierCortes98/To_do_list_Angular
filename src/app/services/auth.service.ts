import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user: User) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).pipe(
      catchError(this.handleError),
      tap((response) => {
        if (response.token) {
          this.tokenService.saveToken(response.token);
        }
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    this.tokenService.removeToken();
  }

  isLogged(): boolean {
    return this.tokenService.isAuthenticated();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';

    if (error.status === 401) {
      errorMessage = error.error.message; // "Usuario no encontrado" o "Contraseña incorrecta"
      console.log('service:', errorMessage);
    }

    return throwError(errorMessage);
  }
}
