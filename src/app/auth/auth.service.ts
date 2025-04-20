import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { RegisterForm } from '../models/register-form.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8085/auth';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // login(credentials: { email: string; password: string }) {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

  register(data: RegisterForm) {
    return this.http.post(`${this.apiUrl}/register`, data, {
      headers: this.headers,
    });
  }

  // logout() {
  //   localStorage.removeItem('token');
  // }

  // setToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // isAuthenticated(): boolean {
  //   return !!this.getToken();
  // }

  login(data: User) {
    return this.http.post<{ token: string }>('/api/auth/login', data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const token = this.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
