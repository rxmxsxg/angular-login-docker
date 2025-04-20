import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //   const authService = inject(AuthService);
  //   const token = authService.getToken();

  //   const authReq = token
  //     ? req.clone({
  //         headers: req.headers.set('Authorization', `Bearer ${token}`),
  //       })
  //     : req;

  //   return next(authReq);
  const token = localStorage.getItem('token');

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq);
  }

  return next(req);
};
