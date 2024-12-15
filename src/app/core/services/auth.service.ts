import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  login(): void {
    sessionStorage.setItem(this.TOKEN_KEY, 'login-token');
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
