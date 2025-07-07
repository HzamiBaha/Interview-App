import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
=======
import { Observable } from 'rxjs';
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5

export interface Task {
  id?: number;
  title: string;
  completed: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
<<<<<<< HEAD
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
=======

  constructor(private http: HttpClient) {}

  getTasks(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?userId=${userId}`);
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
<<<<<<< HEAD
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.loadTasks()) // Reload tasks after creating
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      tap(() => this.loadTasks()) // Reload tasks after updating
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadTasks()) // Reload tasks after deleting
    );
=======
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
  }
}