import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  credentials = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  passwordsMatch(): boolean {
    return this.credentials.password === this.credentials.confirmPassword;
  }

  onSubmit(): void {
    if (this.credentials.email && this.credentials.password && this.passwordsMatch()) {
      this.authService.register(this.credentials.email, this.credentials.password)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Registration successful! Please login.';
            this.errorMessage = null;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (error) => {
            this.errorMessage = 'Registration failed. Please try again.';
            this.successMessage = null;
            console.error('Registration error:', error);
          }
        });
    }
  }
}