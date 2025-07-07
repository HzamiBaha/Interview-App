import { Component } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
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
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5

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
<<<<<<< HEAD
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });
=======
// create form controls with validation email and password
// add confirmPassword field with validation
  }, );
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5

  errorMessage: string | null = null;
  successMessage: string | null = null;

<<<<<<< HEAD
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
=======
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  passwordMatchValidator(form: any) {
  
    // Custom validator to check if password and confirmPassword match
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
<<<<<<< HEAD
      const { email, password } = this.registerForm.value;
      this.authService.register({ email: email!, password: password! }).subscribe({
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
        }
      });
=======
    //handle registration with authservice
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
    }
  }
}