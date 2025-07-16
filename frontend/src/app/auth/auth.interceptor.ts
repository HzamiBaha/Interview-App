import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
// Inject the AuthService to access the current user token
// set the Authorization header with the token if the user is authenticated

  return next(req);
};