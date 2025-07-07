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
  sub: string;  // This is the user ID in string format
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

 login(email: string, password: string): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          this.setCurrentUser(response.accessToken);
        }),
        map(response => response.accessToken)
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

  getCurrentUserId() {
    // Get the current user ID from the BehaviorSubject
    const currentUser = this.currentUserSubject.getValue();
    return currentUser ? parseInt(currentUser.sub, 10) : null;

  }

  getCurrentUserEmail() {
// Get the current user email from the BehaviorSubject
    
  }

  private setCurrentUser(token: string): void {
    // Decode the token and set the current user
  }
  // Add this method to the AuthService class
  register(email: string, password: string) {
  return this.http.post<User>(`${this.apiUrl}/register`, {
    email: email ?? '',
    password: password ?? ''
  });
}
}