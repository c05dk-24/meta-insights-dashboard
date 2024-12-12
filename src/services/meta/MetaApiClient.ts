import { AxiosInstance } from 'axios';
import { MetaInsightsParams, DateRange } from '../../types/meta';
import { handleApiError } from './utils/errorHandler';
import { buildQueryParams } from './utils/queryBuilder';
import { API_PATHS } from '../../utils/config';

export class MetaApiClient {
  constructor(private axios: AxiosInstance) {}

  async getAccountInfo(accountId: string) {
    console.log('MetaApiClient.getAccountInfo - Account ID:', accountId);
    try {
      const { data } = await this.axios.get(`${API_PATHS.META.ACCOUNT_INFO}/${accountId}`, {
        params: {
          fields: 'name,id'
        }
      });
      console.log('MetaApiClient.getAccountInfo - Response:', data);
      return data;
    } catch (error) {
      console.error('MetaApiClient.getAccountInfo - Error:', error);
      throw handleApiError(error);
    }
  }

  // ... rest of the client methods
}