import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { decodeJwt, getExpDate, isExpired } from './jwt.utils';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = `${environment.apiUrl}`;
  private readonly KEY = 'access_token';

  constructor(private http: HttpClient) { }

  // ---- Cookie helpers (token is stored in a JS-readable cookie) ----
  private setCookie(name: string, value: string, expires?: Date | null): void {
    let cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
    if (expires) {
      cookie += `; expires=${expires.toUTCString()}`;
    }
    document.cookie = cookie;
  }

  private getCookie(name: string): string | null {
    const escaped = name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1');
    const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  }

  private rolesSubject = new BehaviorSubject<string[]>(this.roles);
  roles$ = this.rolesSubject.asObservable();

  login(email: string, password: string) {
    return this.http.post<string>(`${this.baseUrl}/api/auth/login`, { email, password }, { responseType: 'text' as 'json' });
  }

  register(username: string, password: string, email: string, termsAccepted: boolean) {
    return this.http.post<string>(`${this.baseUrl}/api/auth/register`, { username, password, email, termsAccepted }, { responseType: 'text' as 'json' });
  }

  saveToken(token: string) {
    // Persist the token in a cookie whose lifetime matches the JWT's exp claim.
    this.setCookie(this.KEY, token, getExpDate(token));
    this.rolesSubject.next(this.roles);
  }


  getToken(): string | null {
    return this.getCookie(this.KEY);
  }


  logout() {
    this.deleteCookie(this.KEY);
    this.rolesSubject.next([]);
  }

  isLoggedIn(): boolean {
    const t = this.getToken();
    return !!t && !isExpired(t);
  }

  get roles(): string[] {
    const t = this.getToken();
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
  getName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = decodeJwt<{ sub?: string }>(token);
      return payload?.sub ? decodeURIComponent(payload.sub) : null;
    } catch {
      return null;
    }
  }

  getUserId(): Observable<number> {
    if (this.isLoggedIn()) {
      return this.http.get<number>(`${this.baseUrl}/userId/${this.getName()}`);
    }
    return of(0);
  }

  getUserById(userId: number): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/user/${userId}`);

  }

}
