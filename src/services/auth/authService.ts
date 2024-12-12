import { authApi } from './api/authApi';
import { LoginCredentials, LoginResponse } from './types';
import { AuthStorage } from './storage/AuthStorage';
import { validateLoginInput } from './validation';

export class AuthService {
  private storage: AuthStorage;

  constructor() {
    this.storage = new AuthStorage();
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    // Validate input
    const validationError = validateLoginInput({ email, password });
    if (validationError) {
      throw validationError;
    }

    try {
      // Prepare login request
      const credentials: LoginCredentials = {
        email,
        password
      };

      // Make API request
      const response = await authApi.login(credentials);

      // Store auth data
      this.storage.saveAuth(response.token, response.user);

      return response;
    } catch (error) {
      console.error('Auth Service - Login Error:', error);
      throw error;
    }
  }

  logout(): void {
    this.storage.clearAuth();
  }

  isAuthenticated(): boolean {
    return !!this.storage.getToken();
  }
}