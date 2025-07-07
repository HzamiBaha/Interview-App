import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
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
  sub: string; 
}

@Injectable({
  providedIn: 'root'
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
    return this.http.post<{ accessToken: string, user: User }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          this.setCurrentUser(response.accessToken);
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
    const currentUser = this.currentUserSubject.value;
    return currentUser ? parseInt(currentUser.sub) : null;
  }

  getCurrentUserEmail(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.email : null;
  }

  private setCurrentUser(token: string): void {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      this.currentUserSubject.next(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();
    }
  }
  
  register(email: string, password: string): Observable<any> {
    return this.http.post<{ accessToken: string, user: User }>(`${this.apiUrl}/register`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          this.setCurrentUser(response.accessToken);
        })
      );
  }
}