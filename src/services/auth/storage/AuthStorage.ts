import { AUTH_STORAGE_KEYS } from '../constants';
import { User } from '../../../types/auth';
import axios from 'axios';

export class AuthStorage {
  saveAuth(token: string, user: User): void {
    localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
    this.setupAxiosAuth(token);
  }

  clearAuth(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    this.clearAxiosAuth();
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  private setupAxiosAuth(token: string): void {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  private clearAxiosAuth(): void {
    delete axios.defaults.headers.common['Authorization'];
  }
}