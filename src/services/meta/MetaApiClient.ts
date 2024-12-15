import { AxiosInstance } from 'axios';
import { META_API_CONFIG } from './config';

export class MetaApiClient {
  constructor(private axios: AxiosInstance) {}

  private buildUrl(endpoint: string): string {
    return `${META_API_CONFIG.BASE_URL}${endpoint}`;
  }

  async get(endpoint: string, config?: any) {
    console.log('MetaApiClient.get - Request:', { 
      url: this.buildUrl(endpoint), 
      config,
      apiVersion: META_API_CONFIG.VERSION
    });

    try {
      const response = await this.axios.get(this.buildUrl(endpoint), {
        ...config,
        params: {
          ...config?.params,
          version: META_API_CONFIG.VERSION
        }
      });
      
      console.log('MetaApiClient.get - Response:', response.data);
      return response;
    } catch (error: any) {
      console.error('MetaApiClient.get - Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }
}