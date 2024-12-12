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
    console.log('MetaService.getInsights - Meta Page ID:', params.accountId);
    
    try {
      const data = await this.client.getInsights(params);
      console.log('MetaService.getInsights - Raw response:', data);
      
      const transformed = MetaDataTransformer.transformInsights(data);
      console.log('MetaService.getInsights - Transformed data:', transformed);
      
      return transformed;
    } catch (error) {
      console.error('MetaService.getInsights - Error:', error);
      throw error;
    }
  }

  async getAccountInfo(accountId: string): Promise<{ name: string }> {
    console.log('MetaService.getAccountInfo - Meta Page ID:', accountId);
    try {
      const data = await this.client.getAccountInfo(accountId);
      console.log('MetaService.getAccountInfo - Response:', data);
      return { name: data.name };
    } catch (error) {
      console.error('MetaService.getAccountInfo - Error:', error);
      throw error;
    }
  }

  // ... rest of the service methods
}