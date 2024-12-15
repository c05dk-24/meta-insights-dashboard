import { AxiosInstance } from 'axios';
import { InsightsResponse, DateRange } from '../../types/meta';
import { transformInsightsData } from './transformers/insightsTransformer';

export class MetaInsightsService {
  constructor(private axios: AxiosInstance) {}

  async getInsights(accountId: string, dateRange: DateRange): Promise<InsightsResponse> {
    try {
      // Check if Meta account is connected
      if (!accountId) {
        throw new Error('Meta account not connected. Please connect your Meta account in settings.');
      }

      const { data } = await this.axios.get('/api/meta/insights', {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          page_id: accountId,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          fields: 'impressions,reach,actions,spend'
        }
      });

      return transformInsightsData(data);
    } catch (error: any) {
      // Handle specific Meta API errors
      if (error.response?.data?.error?.code === 100) {
        throw new Error('Meta account not found or insufficient permissions. Please check your connection.');
      }
      
      console.error('MetaInsightsService.getInsights error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch Meta insights');
    }
  }
}