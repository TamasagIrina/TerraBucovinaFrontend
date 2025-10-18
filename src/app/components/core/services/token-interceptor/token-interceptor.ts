import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-sevices.service';
import { REQUIRES_AUTH } from '../api-service/api.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const needsAuth = req.context.get(REQUIRES_AUTH);
  if (!needsAuth || req.headers.has('Authorization')) {
    return next(req);
  }

  const token = auth.getToken();
  if (!token) return next(req);
  console.log(token);

  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    console.log(authReq);
  return next(authReq);
};
