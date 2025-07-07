import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const auth = inject(AuthService);
const token = localStorage.getItem('token');
  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  
// set the Authorization header with the token if the user is authenticated

  return next(request);
};