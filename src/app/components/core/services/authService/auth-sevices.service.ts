import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { tap } from 'rxjs';
import { decodeJwt, isExpired } from './jwt.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = `${environment.apiUrl}`;
  private readonly KEY = 'access_token';
 
  constructor(private http: HttpClient) { }

   login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/api/auth/login`, { username, password })
      .pipe(tap(res => localStorage.setItem(this.KEY, res.token)));
  }

  getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }


  logout() {
    localStorage.removeItem(this.KEY);
  }

   isLoggedIn(): boolean {
    const t = localStorage.getItem(this.KEY);
    return !!t && !isExpired(t);
  }

  get roles(): string[] {
    const t = localStorage.getItem(this.KEY);
    if (!t) return [];
    try {
      const payload = decodeJwt<any>(t);
      return payload?.roles ?? payload?.authorities ?? [];
    } catch {
      return [];
    }
  }

   hasRole(role: string): boolean {
    return this.roles.includes(role);
  }


  hasAnyRole(roles: string[]): boolean {
    return roles.some(r => this.roles.includes(r));
  }
  // getRole(username: string){
  //   return this.http.get<any>(`${this.baseUrl}/api/auth/login/${username}`)
  //   .pipe(tap(res => localStorage.setItem("role", res as any)));
  // }
}
