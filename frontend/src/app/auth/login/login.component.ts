import { Component } from '@angular/core';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
<<<<<<< HEAD
    FormsModule,
=======
    ReactiveFormsModule,
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
<<<<<<< HEAD
  credentials = {
    email: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.credentials.email && this.credentials.password) {
      this.authService.login(this.credentials).subscribe({
        next: (response: any) => {
          console.log('Login successful');
        },
        error: (error: any) => {
          this.errorMessage = 'Invalid credentials';
          console.error('Login error:', error);
        }
      });
=======
  loginForm = this.fb.group({
// create form controls with validation email and password
  });

  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      // handle login with authservice
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
    }
  }
}