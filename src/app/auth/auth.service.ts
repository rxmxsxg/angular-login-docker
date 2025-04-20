import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8085/auth';

  constructor(private http: HttpClient) {}

  // login(credentials: { email: string; password: string }) {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

  register(data: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
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

  login(data: { email: string; password: string }) {
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
