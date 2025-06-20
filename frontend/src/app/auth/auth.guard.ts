import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {

  // Inject AuthService and Router using Angular's dependency injection
  // navigate to /login if user is not authenticated

  return false;
};