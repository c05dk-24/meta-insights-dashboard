import axios, { AxiosInstance } from 'axios';
import { getApiUrl } from '../../utils/config';
import { LoginResponse } from '../../types/auth';

export class AuthApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: getApiUrl(),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    });
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log('AuthApiClient - Attempting login:', { email });
      const response = await this.client.post('/api/auth/login', { email, password });
      console.log('AuthApiClient - Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('AuthApiClient - Login error:', error);
      throw error;
    }
  }
}