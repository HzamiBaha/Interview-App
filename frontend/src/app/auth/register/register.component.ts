import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
// create form controls with validation email and password
// add confirmPassword field with validation
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    updateOn: 'submit', 
    validators: this.passwordMatchValidator 
  }, );

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  passwordMatchValidator(form: any) {
  
    // Custom validator to check if password and confirmPassword match
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
    //handle registration with authservice
      const { email, password } = this.registerForm.value;
      if (typeof email === 'string' && typeof password === 'string') {
        this.authService.register(email, password).subscribe({
          next: () => {
            // Handle successful registration
            this.successMessage = 'Registration successful! You can now log in.';
            this.errorMessage = null;
          },
          error: (error) => {
            this.errorMessage = error.message;
            this.successMessage = null;
          }
        });
      } else {
        this.errorMessage = 'Email and password are required.';
      }
    }
  }
}