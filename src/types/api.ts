import { AxiosInstance, AxiosResponse } from 'axios';
import { MetaInsightsParams, InsightsResponse, Campaign, AdSet } from './meta';

export interface ApiClient {
  axios: AxiosInstance;
  getInsights(params: MetaInsightsParams): Promise<AxiosResponse<InsightsResponse>>;
  getCampaigns(accountId: string, dateRange: { from: Date; to: Date }): Promise<Campaign[]>;
  getAdSets(campaignId: string, dateRange: { from: Date; to: Date }): Promise<AdSet[]>;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}