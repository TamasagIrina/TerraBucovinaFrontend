import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { decodeJwt, isExpired } from './jwt.utils';
import { User } from '../../interfaces/user.interface';

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

  register(username: string, password: string, email: string, termsAccepted: boolean) {
    return this.http.post<string>(`${this.baseUrl}/api/auth/register`, { username, password, email, termsAccepted }, { responseType: 'text' as 'json' });
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
  getName(): string | null {
    const token = localStorage.getItem(this.KEY);
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
