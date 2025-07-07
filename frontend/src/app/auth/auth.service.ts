import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
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

  login(email: string, password: string): Observable<boolean> {
    // save user token to local storage and set current user
    return this.http
      .post<any>(
        this.apiUrl + '/login',
        { email, password },
        { observe: 'response' }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          if (
            !response ||
            response.status !== HttpStatusCode.Ok ||
            !response.body.accessToken
          ) {
            return false;
          }
          localStorage.setItem('token', response.body.accessToken);
          this.setCurrentUser(response.body.accessToken);
          return true;
        })
      );
  }

  logout(): void {
    // Remove token from local storage and reset current user
    // get back to login page
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
    return this.currentUserSubject.value?.sub;
  }

  getCurrentUserEmail() {
    // Get the current user email from the BehaviorSubject
    return this.currentUserSubject.value?.email;
  }

  private setCurrentUser(token: string): void {
    // Decode the token and set the current user
    const decoded = jwtDecode<TokenPayload>(token);
    this.currentUserSubject.next(decoded);
  }
  // Add this method to the AuthService class
  register(email: string, password: string) {
    // Register a new user by sending a POST request to the API
    return this.http
      .post<User>(
        this.apiUrl + '/register',
        { email, password },
        { observe: 'response' }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          console.log(response);

          if (!response || response.status !== HttpStatusCode.Created) {
            return false;
          }

          return true;
        })
      );
  }
}
