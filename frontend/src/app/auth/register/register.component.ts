import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    // create form controls with validation email and password
    // add confirmPassword field with validation
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  passwordMatchValidator(form: FormGroup) {
    // Custom validator to check if password and confirmPassword match
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      //handle registration with authservice
      if (this.passwordMatchValidator(this.registerForm)) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }
      this.authService
        .register(
          this.registerForm.get('email')?.value!,
          this.registerForm.get('password')?.value!
        )
        .subscribe({
          next: (succes) => {
            if (succes) {
              console.log(succes);

              this.successMessage = 'Registration successful! Please log in.';
              this.errorMessage = null;
            } else {
              this.errorMessage = 'Registration failed. Please try again.';
            }
          },
          error: (error) => {
            this.errorMessage =
              'An error occurred during registration. Please try again.';
          },
        });
    }
  }
}
