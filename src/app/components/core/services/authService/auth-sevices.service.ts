import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { decodeJwt, isExpired } from './jwt.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = `${environment.apiUrl}`;
  private readonly KEY = 'access_token';

  constructor(private http: HttpClient) { }

  private rolesSubject = new BehaviorSubject<string[]>(this.roles);
  roles$ = this.rolesSubject.asObservable();

  login(email: string, password: string) {
    return this.http.post<string>(`${this.baseUrl}/api/auth/login`, { email, password }, { responseType: 'text' as 'json' });
  }

  register(username: string, password: string, email: string) {
    return this.http.post<string>(`${this.baseUrl}/api/auth/register`, { username, password, email }, { responseType: 'text' as 'json' });
  }

  saveToken(token: string) {
    localStorage.setItem(this.KEY, token);
    this.rolesSubject.next(this.roles);
  }


  getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }


  logout() {
    localStorage.removeItem(this.KEY);
    this.rolesSubject.next([]);
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
