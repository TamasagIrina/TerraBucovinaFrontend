import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth-sevices.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1️⃣ verificăm dacă este logat
  if (!auth.isLoggedIn()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // 2️⃣ dacă ruta are definit un rol în `data`, îl verificăm
  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  if (requiredRoles && !auth.hasAnyRole(requiredRoles)) {
    // dacă nu are rolul potrivit, îl trimitem la o pagină separată
    router.navigate(['/forbidden']);
    return false;
  }

  // 3️⃣ dacă e logat și are rolul potrivit — acces permis
  return true;
};
