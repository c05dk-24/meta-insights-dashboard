import { AxiosInstance } from 'axios';
import { InsightsResponse, DateRange } from '../../types/meta';
import { transformInsightsData } from './transformers/insightsTransformer';
import { META_API_ENDPOINTS, META_API_FIELDS } from './config/endpoints';
import { formatAccountId, isValidAccountId } from './utils/accountId';

export class MetaInsightsService {
  constructor(private axios: AxiosInstance) {}

  async getInsights(accountId: string, dateRange: DateRange): Promise<InsightsResponse> {
    try {
      if (!isValidAccountId(accountId)) {
        throw new Error('Invalid Meta account ID');
      }

      const formattedId = accountId.replace('act_', '');
      const endpoint = META_API_ENDPOINTS.INSIGHTS(formattedId);

      console.log('Fetching insights:', {
        endpoint,
        accountId: formattedId,
        dateRange
      });

      const { data } = await this.axios.get(endpoint, {
        params: {
          fields: META_API_FIELDS.INSIGHTS,
          time_range: JSON.stringify({
            since: dateRange.startDate,
            until: dateRange.endDate
          }),
          access_token: process.env.META_ACCESS_TOKEN
        }
      });

      if (!data || !data.data || !data.data.length) {
        throw new Error('No insights data available');
      }

      console.log('Insights response:', data);
      return transformInsightsData(data.data[0]);
    } catch (error: any) {
      console.error('Failed to fetch insights:', error.response?.data || error);
      
      if (error.response?.data?.error?.message) {
        throw new Error(error.response.data.error.message);
      }
      
      throw new Error('Failed to fetch Meta insights');
    }
  }
}