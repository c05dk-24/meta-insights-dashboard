```typescript
import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_CONFIG } from './config';

class ApiClient {
  private client: AxiosInstance;
  private retryCount: Map<string, number>;

  constructor() {
    const baseURL = `${API_CONFIG.baseURL}/api`;
    
    this.client = axios.create({
      baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers
    });

    this.retryCount = new Map();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const url = config.url?.replace(/\/+/g, '/');
        console.log('API Request:', {
          method: config.method?.toUpperCase(),
          url,
          data: config.data
        });
        return { ...config, url };
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log('API Response:', {
          status: response.status,
          data: response.data
        });
        return response;
      },
      async (error: AxiosError) => {
        if (!error.config) return Promise.reject(error);

        const requestKey = `${error.config.method}-${error.config.url}`;
        const currentRetryCount = this.retryCount.get(requestKey) || 0;

        if (
          currentRetryCount < API_CONFIG.retries &&
          (!error.response || error.response.status >= 500)
        ) {
          this.retryCount.set(requestKey, currentRetryCount + 1);
          await new Promise(resolve => 
            setTimeout(resolve, API_CONFIG.retryDelay * (currentRetryCount + 1))
          );
          return this.client(error.config);
        }

        this.retryCount.delete(requestKey);
        return Promise.reject(error.response?.data || error);
      }
    );
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

export const apiClient = new ApiClient();
```