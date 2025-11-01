import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth-sevices.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  if (requiredRoles && !auth.hasAnyRole(requiredRoles)) {
  
    router.navigate(['/forbidden']);
    return false;
  }

 
  return true;
};
