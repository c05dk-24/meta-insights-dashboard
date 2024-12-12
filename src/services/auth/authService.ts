import axios from 'axios';
import { User } from '../../types/auth';
import { getApiUrl } from '../../utils/config';
import { transformUserResponse } from './transforms/userTransform';

const API_URL = getApiUrl();

export class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        }
      );

      const { token, user } = response.data;
      const transformedUser = transformUserResponse(user);
      
      this.persistAuth(token, transformedUser);
      
      console.log('Auth Service - Login Success:', {
        userId: transformedUser.id,
        email: transformedUser.email,
        companyId: transformedUser.company_id,
        companyName: transformedUser.companyName
      });
      
      return { user: transformedUser, token };
    } catch (error: any) {
      console.error('Auth Service - Login Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }

  logout() {
    const user = this.getStoredUser();
    
    console.log('Auth Service - Logout:', {
      userId: user?.id,
      companyName: user?.companyName
    });
    
    this.clearAuth();
  }

  private persistAuth(token: string, user: User) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  private clearAuth() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    delete axios.defaults.headers.common['Authorization'];
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('auth_user');
    return userStr ? JSON.parse(userStr) : null;
  }
}