import axios, { AxiosInstance } from 'axios';
import { META_API_ENDPOINTS } from './config/endpoints';
import { getApiUrl } from '../../utils/config';

export class MetaApiClient {
  private client: AxiosInstance;

  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: getApiUrl(),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      config => {
        console.log('Meta API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params
        });
        return config;
      },
      error => {
        console.error('Meta API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => {
        console.log('Meta API Response:', response.data);
        return response;
      },
      error => {
        console.error('Meta API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });

        if (error.response?.data?.error) {
          const metaError = error.response.data.error;
          throw new Error(`Meta API Error: ${metaError.message}`);
        }
        throw error;
      }
    );
  }

  async get(endpoint: string, params: Record<string, any> = {}) {
    try {
      const response = await this.client.get(
        `${META_API_ENDPOINTS.BASE_URL}${endpoint}`,
        { params }
      );
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