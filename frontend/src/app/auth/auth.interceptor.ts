import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
<<<<<<< HEAD
  const token = localStorage.getItem('token');
  
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  
=======
// Inject the AuthService to access the current user token
// set the Authorization header with the token if the user is authenticated

>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
  return next(req);
};