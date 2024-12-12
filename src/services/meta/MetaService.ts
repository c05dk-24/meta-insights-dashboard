import { AxiosInstance } from 'axios';
import { MetaApiClient } from './MetaApiClient';
import { MetaDataTransformer } from './MetaDataTransformer';
import { DateRange, MetaInsightsParams, InsightsResponse } from '../../types/meta';

export class MetaService {
  private client: MetaApiClient;

  constructor(axios: AxiosInstance) {
    this.client = new MetaApiClient(axios);
  }

  async getInsights(params: MetaInsightsParams): Promise<InsightsResponse> {
    console.log('MetaService.getInsights - Params:', params);

    try {
      const response = await this.client.get('/api/meta/insights', {
        params: {
          page_id: params.accountId,
          start_date: params.start_date,
          end_date: params.end_date,
          fields: 'impressions,reach,actions,spend'
        }
      });

      console.log('MetaService.getInsights - Response:', response.data);
      return MetaDataTransformer.transformInsights(response.data);
    } catch (error) {
      console.error('MetaService.getInsights - Error:', error);
      throw error;
    }
  }

  async getCampaigns(accountId: string, dateRange: DateRange) {
    console.log('MetaService.getCampaigns - Params:', { accountId, dateRange });

    try {
      const response = await this.client.get('/api/meta/campaigns', {
        params: {
          page_id: accountId,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          fields: 'campaign_id,campaign_name,insights'
        }
      });

      console.log('MetaService.getCampaigns - Response:', response.data);
      return MetaDataTransformer.transformCampaigns(response.data.data || []);
    } catch (error) {
      console.error('MetaService.getCampaigns - Error:', error);
      throw error;
    }
  }
}