import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }
  getTasks(userId: number): Observable<Task[]> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post<any>(`${this.apiUrl}`, userId, { headers });
    } else {
      return new Observable(observer => observer.error('Token not available'));
    }}
 
  getTask(id: number): Observable<Task> {
    const token = this.getToken();
    if (token) {  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers });
    }
    return new Observable(observer => observer.error('Token not available'));
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post<Task>(this.apiUrl, task, { headers });
    }  
    return new Observable(observer => observer.error('Token not available'));
  }

  updateTask(task: Task): Observable<Task> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, { headers });
    }
    return new Observable(observer => observer.error('Token not available'));}

  deleteTask(id: number): Observable<void> {
    const token = this.getToken();
    if (token) {  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
    return new Observable(observer => observer.error('Token not available'));}
  private getToken(): string | null {
    return localStorage.getItem('token');
  }
}