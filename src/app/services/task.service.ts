import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  postTask(taskTitle: string, listId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, { taskTitle, listId });
  }

  deleteTask(listId: string, taskId: string): Observable<any> {
    const body = { taskId, listId };
    return this.http.delete(`${this.apiUrl}/tasks`, { body });
  }
}
