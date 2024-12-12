import axios, { AxiosInstance } from 'axios';
import { META_API_ENDPOINTS } from './config/endpoints';

export class MetaApiClient {
  private client: AxiosInstance;

  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: META_API_ENDPOINTS.BASE_URL,
      params: {
        access_token: accessToken
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.data?.error) {
          const metaError = error.response.data.error;
          throw new Error(`Meta API Error: ${metaError.message} (Code: ${metaError.code})`);
        }
        throw error;
      }
    );
  }

  async get(endpoint: string, params: Record<string, any> = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error('Meta API request failed:', {
        endpoint,
        params,
        error: error instanceof Error ? error.message : error
      });
      throw error;
    }
  }
}