import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user: User) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
      }),
      catchError((error) => {
        console.error('Error en el login:', error);
        return of(null); // Retorna un Observable con `null` para evitar fallos
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
}
