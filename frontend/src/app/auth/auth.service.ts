import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string;
  password: string;
  id: number;
}

interface TokenPayload {
  email: string;
  iat: number;
  exp: number;
  sub: string; // This is the user ID in string format
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<TokenPayload | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setCurrentUser(token);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap({
          next: (response) => {
            localStorage.setItem('token', response.accessToken);
            this.setCurrentUser(response.accessToken);
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            // Handle error here, e.g., show a notification or log
            console.error('Login failed:', err);
          },
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getCurrentUserId(): number | null {
    const user = this.currentUserSubject.value;
    return user ? parseInt(user.sub, 10) : null; // Convert string ID to number
  }

  getCurrentUserEmail(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.email : null;
  }

  private setCurrentUser(token: string): void {
    const decoded = jwtDecode<TokenPayload>(token);
    this.currentUserSubject.next(decoded);
  }
  // Add this method to the AuthService class
  register(email: string, password: string): Observable<any> {
    return this.http
      .post<User>(`${this.apiUrl}/users`, { email, password })
      .pipe(
        tap(() => {
          // After successful registration, automatically log the user in
          this.login(email, password).subscribe();
        })
      );
  }
}
