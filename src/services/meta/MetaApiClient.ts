import { AxiosInstance } from 'axios';
import { MetaInsightsParams, DateRange } from '../../types/meta';
import { handleApiError } from './utils/errorHandler';
import { buildQueryParams } from './utils/queryBuilder';
import { API_PATHS } from '../../utils/config';

export class MetaApiClient {
  constructor(private axios: AxiosInstance) {}

  async getInsights(params: MetaInsightsParams) {
    console.log('MetaApiClient.getInsights - Params:', params);
    try {
      const queryParams = buildQueryParams('insights', params);
      console.log('MetaApiClient.getInsights - Query params:', queryParams);

      const { data } = await this.axios.get(API_PATHS.META.INSIGHTS, { params: queryParams });
      console.log('MetaApiClient.getInsights - Response:', data);
      return data;
    } catch (error) {
      console.error('MetaApiClient.getInsights - Error:', error);
      throw handleApiError(error);
    }
  }

  async getCampaigns(accountId: string, dateRange: DateRange) {
    console.log('MetaApiClient.getCampaigns - Params:', { accountId, dateRange });
    try {
      const queryParams = buildQueryParams('campaigns', {
        accountId,
        ...dateRange,
        level: 'campaign'
      });
      console.log('MetaApiClient.getCampaigns - Query params:', queryParams);

      const { data } = await this.axios.get(API_PATHS.META.CAMPAIGNS, { params: queryParams });
      console.log('MetaApiClient.getCampaigns - Response:', data);
      return data;
    } catch (error) {
      console.error('MetaApiClient.getCampaigns - Error:', error);
      throw handleApiError(error);
    }
  }

  async getAdSets(accountId: string, campaignId: string, dateRange: DateRange) {
    console.log('MetaApiClient.getAdSets - Params:', { accountId, campaignId, dateRange });
    try {
      const queryParams = buildQueryParams('adsets', {
        accountId,
        ...dateRange,
        level: 'adset'
      });
      console.log('MetaApiClient.getAdSets - Query params:', queryParams);

      const url = API_PATHS.META.ADSETS.replace(':campaignId', campaignId);
      const { data } = await this.axios.get(url, { params: queryParams });
      console.log('MetaApiClient.getAdSets - Response:', data);
      return data;
    } catch (error) {
      console.error('MetaApiClient.getAdSets - Error:', error);
      throw handleApiError(error);
    }
  }
}