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

  login(email: string, password: string){
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
                console.log(response);

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
    const currentUser = this.currentUserSubject.value;
    return currentUser ? parseInt(currentUser.sub, 10) : null;

  }

  getCurrentUserEmail() {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.email : null;
  }
    
  

  private setCurrentUser(token: string): void {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      this.currentUserSubject.next(decoded);
    } catch (error) {
      console.error('Invalid token', error);
      this.currentUserSubject.next(null);
    }
  }
  register(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, { email, password }).pipe(    
    );
} 
 isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && this.isTokenValid(token);
  }
  private isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      console.error('Invalid token', error);
      return false;
    }
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}