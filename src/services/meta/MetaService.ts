import { AxiosInstance } from 'axios';
import { MetaApiClient } from './MetaApiClient';
import { MetaDataTransformer } from './MetaDataTransformer';
import { DateRange, MetaInsightsParams, InsightsResponse, Campaign, AdSet } from '../../types/meta';

export class MetaService {
  private client: MetaApiClient;

  constructor(axios: AxiosInstance) {
    this.client = new MetaApiClient(axios);
  }

  async getInsights(params: MetaInsightsParams): Promise<InsightsResponse> {
    console.log('MetaService.getInsights - Input params:', params);
    
    try {
      // Add access token to params
      const paramsWithToken = {
        ...params,
        access_token: process.env.META_ACCESS_TOKEN || params.access_token
      };

      const data = await this.client.getInsights(paramsWithToken);
      console.log('MetaService.getInsights - Raw response:', data);
      
      const transformed = MetaDataTransformer.transformInsights(data);
      console.log('MetaService.getInsights - Transformed data:', transformed);
      
      return transformed;
    } catch (error) {
      console.error('MetaService.getInsights - Error:', error);
      throw error;
    }
  }

  async getCampaigns(accountId: string, dateRange: DateRange): Promise<Campaign[]> {
    console.log('MetaService.getCampaigns - Input:', { accountId, dateRange });
    
    try {
      const data = await this.client.getCampaigns(accountId, dateRange);
      console.log('MetaService.getCampaigns - Raw response:', data);
      
      const transformed = MetaDataTransformer.transformCampaigns(data.data || []);
      console.log('MetaService.getCampaigns - Transformed data:', transformed);
      
      return transformed;
    } catch (error) {
      console.error('MetaService.getCampaigns - Error:', error);
      throw error;
    }
  }

  async getAdSets(accountId: string, campaignId: string, dateRange: DateRange): Promise<AdSet[]> {
    console.log('MetaService.getAdSets - Input:', { accountId, campaignId, dateRange });
    
    try {
      const data = await this.client.getAdSets(accountId, campaignId, dateRange);
      console.log('MetaService.getAdSets - Raw response:', data);
      
      const transformed = MetaDataTransformer.transformAdSets(data.data || []);
      console.log('MetaService.getAdSets - Transformed data:', transformed);
      
      return transformed;
    } catch (error) {
      console.error('MetaService.getAdSets - Error:', error);
      throw error;
    }
  }
}