import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getLists(boardId: string): Observable<List[]> {
    return this.http.get<List[]>(`${this.apiUrl}/lists`, {
      params: { boardId },
    });
  }

  postList(title: string, boardId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/lists`, { title, boardId });
  }
}
