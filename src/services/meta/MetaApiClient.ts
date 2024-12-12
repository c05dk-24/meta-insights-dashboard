import { AxiosInstance } from 'axios';
import { MetaInsightsParams, DateRange } from '../../types/meta';
import { handleApiError } from './utils/errorHandler';
import { buildQueryParams } from './utils/queryBuilder';

export class MetaApiClient {
  constructor(private axios: AxiosInstance) {}

  async getInsights(params: MetaInsightsParams) {
    try {
      const { data } = await this.axios.get(`/api/meta/ads/insights`, {
        params: buildQueryParams('insights', params)
      });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getCampaigns(accountId: string, dateRange: DateRange) {
    try {
      const { data } = await this.axios.get(`/api/meta/ads/insights`, {
        params: buildQueryParams('campaigns', {
          ...dateRange,
          level: 'campaign'
        })
      });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getAdSets(accountId: string, campaignId: string, dateRange: DateRange) {
    try {
      const { data } = await this.axios.get(`/api/meta/ads/insights`, {
        params: buildQueryParams('adsets', {
          ...dateRange,
          level: 'adset',
          campaign_id: campaignId
        })
      });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}