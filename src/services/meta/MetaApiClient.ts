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
    try {
      const pageId = validateMetaPageId(accountId);
      logMetaApiCall('GET', 'account_info', { accountId: pageId });

      const { data } = await this.axios.get(`${API_PATHS.META.ACCOUNT_INFO}/${pageId}`, {
        params: {
          fields: 'name,id'
        }
      });
      
      logMetaApiCall('GET', 'account_info', { accountId: pageId }, data);
      return {
        name: String(data.name),
        id: String(data.id)
      };
    } catch (error) {
      logMetaApiCall('GET', 'account_info', { accountId }, undefined, error);
      throw handleApiError(error);
    }
  }

  async getInsights(params: MetaInsightsParams) {
    try {
      const queryParams = buildQueryParams('insights', params);
      const { data } = await this.axios.get(API_PATHS.META.INSIGHTS, { params: queryParams });
      
      return {
        ...data,
        impressions: Number(data.impressions || 0),
        reach: Number(data.reach || 0),
        leads: Number(data.leads || 0),
        spend: Number(data.spend || 0)
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }
}