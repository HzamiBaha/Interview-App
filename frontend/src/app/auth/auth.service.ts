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

  login(email: string, password: string){
    // save user token to local storage and set current user
  }

  logout(): void {
    // Remove token from local storage and reset current user
    // get back to login page
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

  }

  getCurrentUserEmail() {
// Get the current user email from the BehaviorSubject
    
  }

  private setCurrentUser(token: string): void {
    // Decode the token and set the current user
  }
  // Add this method to the AuthService class
  register(email: string, password: string) {
   // Register a new user by sending a POST request to the API
  }
}