import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
<<<<<<< HEAD
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
=======

  // Inject AuthService and Router using Angular's dependency injection
  // navigate to /login if user is not authenticated

  return false;
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
};