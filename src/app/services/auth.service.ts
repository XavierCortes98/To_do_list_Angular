import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user: User) {
    return this.http
      .post(`${this.apiUrl}/login`, {
        email: user.email,
        password: user.password,
      })
      .subscribe((response: any) => {
        const tokenResponse = response as { token: string };
        console.log(tokenResponse);
        this.tokenService.saveToken(tokenResponse.token);
      });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
