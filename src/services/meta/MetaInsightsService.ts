import { AxiosInstance } from 'axios';
import { InsightsResponse, DateRange } from '../../types/meta';
import { transformInsightsData } from './transformers/insightsTransformer';
import { buildQueryParams } from './utils/queryBuilder';

export class MetaInsightsService {
  constructor(private axios: AxiosInstance) {}

  async getInsights(accountId: string, dateRange: DateRange): Promise<InsightsResponse> {
    try {
      const { data } = await this.axios.get('/api/meta/insights', {
        params: {
          start_date: dateRange.startDate,
          end_date: dateRange.endDate
        }
      });

      return transformInsightsData(data);
    } catch (error: any) {
      console.error('MetaInsightsService.getInsights error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch insights');
    }
  }
}