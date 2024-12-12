import { AxiosInstance } from 'axios';
import { MetaInsightsParams } from '../../types/meta';
import { handleApiError } from './utils/errorHandler';
import { buildQueryParams } from './utils/queryBuilder';
import { logMetaApiCall } from './utils/logging';
import { validateMetaPageId } from '../../utils/validation';
import { API_PATHS } from '../../utils/constants';

export class MetaApiClient {
  constructor(private axios: AxiosInstance) {}

  async getAccountInfo(accountId: string) {
    const pageId = validateMetaPageId(accountId);
    logMetaApiCall('GET', 'account_info', { accountId: pageId });

    try {
      const { data } = await this.axios.get(`${API_PATHS.META.ACCOUNT_INFO}/${pageId}`, {
        params: {
          fields: 'name,id'
        }
      });
      
      logMetaApiCall('GET', 'account_info', { accountId: pageId }, data);
      return data;
    } catch (error) {
      logMetaApiCall('GET', 'account_info', { accountId: pageId }, undefined, error);
      throw handleApiError(error);
    }
  }

  // ... rest of the client methods
}