import { AxiosInstance } from 'axios';
import { handleApiError } from './utils/errorHandler';

export class MetaConnectionService {
  constructor(private axios: AxiosInstance) {}

  async verifyConnection(pageId: string): Promise<boolean> {
    if (!pageId) return false;
    
    try {
      // Test the connection by making a simple insights request
      const { data } = await this.axios.get(`/api/meta/insights`, {
        params: {
          page_id: pageId,
          fields: 'impressions,spend',
          limit: 1
        }
      });

      // If we get data back, the connection is valid
      return Boolean(data && data.data && data.data.length > 0);
    } catch (error) {
      console.error('Connection verification failed:', error);
      return false;
    }
  }
}