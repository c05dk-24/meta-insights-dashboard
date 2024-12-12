import { User, LoginResponse } from '../../types/auth';
import { AuthApiClient } from './AuthApiClient';
import { AuthStorage } from './AuthStorage';
import { transformUserResponse } from './transforms/userTransform';
import { handleAuthError } from './utils/errorHandler';

export class AuthService {
  private apiClient: AuthApiClient;
  private storage: AuthStorage;

  constructor() {
    this.apiClient = new AuthApiClient();
    this.storage = new AuthStorage();
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.apiClient.login(email, password);
      const { token, user } = response;
      
      const transformedUser = transformUserResponse(user);
      this.storage.saveAuth(token, transformedUser);

      console.log('Auth Service - Login Success:', {
        userId: transformedUser.id,
        email: transformedUser.email,
        companyId: transformedUser.company_id,
        companyName: transformedUser.companyName
      });

      return { user: transformedUser, token };
    } catch (error) {
      throw handleAuthError(error);
    }
  }

  logout(): void {
    const user = this.storage.getUser();
    console.log('Auth Service - Logout:', {
      userId: user?.id,
      companyName: user?.companyName
    });
    this.storage.clearAuth();
  }

  getCurrentUser(): User | null {
    return this.storage.getUser();
  }

  getToken(): string | null {
    return this.storage.getToken();
  }
}