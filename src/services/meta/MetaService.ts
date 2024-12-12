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
    const data = await this.client.getInsights(params);
    return MetaDataTransformer.transformInsights(data);
  }

  async getCampaigns(accountId: string, dateRange: DateRange): Promise<Campaign[]> {
    const data = await this.client.getCampaigns(accountId, dateRange);
    return MetaDataTransformer.transformCampaigns(data.data || []);
  }

  async getAdSets(accountId: string, campaignId: string, dateRange: DateRange): Promise<AdSet[]> {
    const data = await this.client.getAdSets(accountId, campaignId, dateRange);
    return MetaDataTransformer.transformAdSets(data.data || []);
  }
}