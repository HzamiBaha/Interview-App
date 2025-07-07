import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
 this.email = this.loginForm.value.email || '';
 this.password = this.loginForm.value.password || '';
      this.authService.login(this.email, this.password).subscribe({
        next: () => {
          this.errorMessage = null;
          // this.router.navigate('/tasks');
        },
        error: (error) => {
          this.errorMessage = 'Invalid email or password';
          console.error('Login error:', error);
        }
      });
    }
  }
}