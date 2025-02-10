import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(`${this.apiURL}/login`, {
      email: user.email, // Envía directamente email y password, no dentro de un objeto user
      password: user.password,
    });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }
}
