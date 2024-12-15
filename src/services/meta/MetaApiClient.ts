import { AxiosInstance } from 'axios';

export class MetaApiClient {
  constructor(private axios: AxiosInstance) {}

  async get(url: string, config?: any) {
    console.log('MetaApiClient.get - Request:', { url, config });

    try {
      const response = await this.axios.get(url, config);
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