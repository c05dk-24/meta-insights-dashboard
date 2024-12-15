import { AxiosInstance } from 'axios';
import { InsightsResponse, DateRange } from '../../types/meta';
import { transformInsightsData } from './transformers/insightsTransformer';
import { META_API_CONFIG } from './config';

export class MetaInsightsService {
  constructor(private axios: AxiosInstance) {}

  async getInsights(accountId: string, dateRange: DateRange): Promise<InsightsResponse> {
    try {
      if (!accountId) {
        throw new Error('Meta account not connected. Please connect your Meta account in settings.');
      }

      const { data } = await this.axios.get('/api/meta/insights', {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          page_id: accountId,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          fields: META_API_CONFIG.FIELDS.INSIGHTS.join(','),
          version: META_API_CONFIG.VERSION
        }
      });

      return transformInsightsData(data);
    } catch (error: any) {
      if (error.response?.data?.error?.code === 100) {
        throw new Error('Meta account not found or insufficient permissions. Please check your connection.');
      }
      
      if (error.response?.data?.error?.code === 190) {
        throw new Error('Meta access token has expired. Please reconnect your account.');
      }

      console.error('MetaInsightsService.getInsights error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch Meta insights');
    }
  }
}