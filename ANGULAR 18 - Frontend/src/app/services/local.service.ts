import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private readonly key = 'user';

  set user(user: User | null) {
    if (user) {
      localStorage.setItem(this.key, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.key);
      localStorage.removeItem('authToken');
    }
  }

  get user(): User | null {
    const userJson = localStorage.getItem(this.key);
    return userJson ? JSON.parse(userJson) as User : null;
  }

  get token(): string | null {
    return localStorage.getItem('authToken'); // Ahora el token es independiente
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('authToken');
  }
}
