import { AxiosInstance } from 'axios';
import { InsightsResponse, DateRange } from '../../types/meta';
import { transformInsightsData } from './transformers/insightsTransformer';

export class MetaInsightsService {
  constructor(private axios: AxiosInstance) {}

  async getInsights(accountId: string, dateRange: DateRange): Promise<InsightsResponse> {
    try {
      const { data } = await this.axios.get('/api/meta/insights', {
        params: {
          page_id: accountId,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          fields: 'impressions,spend'
        }
      });

      // Check if we have valid data
      if (!data || !data.data || !data.data.length) {
        throw new Error('No insights data available');
      }

      return transformInsightsData(data.data[0]);
    } catch (error: any) {
      console.error('Failed to fetch insights:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch Meta insights');
    }
  }
}