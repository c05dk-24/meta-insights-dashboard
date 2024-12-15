import { AxiosInstance } from 'axios';
import { META_API_ENDPOINTS } from './config/endpoints';
import { isValidAccountId } from './utils/accountId';

export class MetaConnectionService {
  constructor(private axios: AxiosInstance) {}

  async verifyConnection(accountId: string): Promise<boolean> {
    if (!isValidAccountId(accountId)) {
      console.warn('Invalid Meta account ID format:', accountId);
      return false;
    }
    
    try {
      const formattedId = accountId.replace('act_', '');
      const endpoint = META_API_ENDPOINTS.INSIGHTS(formattedId);

      console.log('Verifying connection:', {
        endpoint,
        accountId: formattedId
      });

      const { data } = await this.axios.get(endpoint, {
        params: {
          fields: 'impressions',
          limit: 1,
          access_token: process.env.META_ACCESS_TOKEN
        }
      });

      return Boolean(data && data.data && data.data.length > 0);
    } catch (error) {
      console.error('Connection verification failed:', error);
      return false;
    }
  }
}