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

  // constructor(private http: HttpClient, private router: Router) {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.setCurrentUser(token);
  //   }
  // }
  constructor(private http: HttpClient, private router: Router) {
  const token = localStorage.getItem('token');
  if (token && token.split('.').length === 3) {
    this.setCurrentUser(token);
  } else {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}

  login(email: string, password: string){
    // save user token to local storage and set current user
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.setCurrentUser(response.token);
      }),
      map(response => response.token)
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
    const currentUser = this.currentUserSubject.value;

  }

  getCurrentUserEmail() {
    // Get the current user email from the BehaviorSubject
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.email : null;
// Get the current user email from the BehaviorSubject    
  }

private setCurrentUser(token: string): void {
  if (!token || token.split('.').length !== 3) {
    // Invalid token format, do not set user
    this.currentUserSubject.next(null);
    return;
  }
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    this.currentUserSubject.next(decoded);
  } catch {
    this.currentUserSubject.next(null);
  }
}
// Add this method to the AuthService class
register(email: string, password: string) {
 // Register a new user by sending a POST request to the API
  return this.http.post<User>(`${this.apiUrl}/register`, { email, password }).pipe(
    tap(user => {
      // Optionally, you can log in the user immediately after registration
      this.login(user.email, user.password).subscribe();
    })
  );
}
}