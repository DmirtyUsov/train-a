import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { throwError } from 'rxjs';

interface AuthResponse {
  token: string;
}

interface AuthError {
  error: {
    message: string;
    reason: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = signal<boolean>(false);

  private token: string | null = null;

  private tokenKey = 'token';

  // TODO add interceptor
  private apiSignInUrl = '/api/signin';

  private apiSignUpUrl = '/api/signup';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.isAuthenticated.set(true);
    }
  }

  signIn(email: string, password: string): void {
    const body = { email, password };
    this.http.post<AuthResponse>(this.apiSignInUrl, body).subscribe({
      next: (response: AuthResponse) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.isAuthenticated.set(true);
        console.log('Successful login ', response);
      },
      error: (error: AuthError) => {
        throwError(() => new Error(error.error.message));
      },
    });
  }

  signUp(email: string, password: string): void {
    const body = { email, password };
    this.http.post<void>(this.apiSignUpUrl, body).subscribe({
      next: () => {
        console.log('Successful sign Up ');
      },
      error: (error: AuthError) => {
        throwError(() => new Error(error.error.message));
      },
    });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }
}
