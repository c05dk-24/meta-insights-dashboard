import axios, { AxiosInstance } from 'axios';
import { getApiUrl } from '../../utils/config';
import { LoginResponse } from '../../types/auth';
import { AUTH_ENDPOINTS } from './config/constants';
import { AuthError } from './utils/errorHandler';

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

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log('Auth API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data ? { ...config.data, password: '[REDACTED]' } : undefined
        });
        return config;
      },
      (error) => {
        console.error('Auth API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        console.log('Auth API Response:', {
          status: response.status,
          data: response.data ? { ...response.data, token: '[REDACTED]' } : undefined
        });
        return response;
      },
      (error) => {
        console.error('Auth API Response Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.client.post(AUTH_ENDPOINTS.LOGIN, { 
        email, 
        password,
        // Add any additional required fields for your production API
        client_version: '1.0.0',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });

      if (!response.data.token || !response.data.user) {
        throw new AuthError(
          'Invalid response format from server',
          'INVALID_RESPONSE',
          500
        );
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}