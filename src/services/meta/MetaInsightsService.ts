import { MetaApiClient } from './MetaApiClient';
import { META_API_ENDPOINTS } from './config/endpoints';
import { META_API_FIELDS } from './config/fields';
import { InsightsResponse, DateRange } from '../../types/meta';
import { transformInsightsData } from './transformers/insightsTransformer';

export class MetaInsightsService {
  constructor(private client: MetaApiClient) {}

  async getInsights(pageId: string, dateRange: DateRange): Promise<InsightsResponse> {
    try {
      const data = await this.client.get(
        META_API_ENDPOINTS.INSIGHTS(pageId),
        {
          fields: META_API_FIELDS.INSIGHTS,
          time_range: JSON.stringify({
            since: dateRange.startDate,
            until: dateRange.endDate
          })
        }
      );

      return transformInsightsData(data.data || []);
    } catch (error) {
      console.error('Failed to fetch Meta insights:', error);
      throw error;
    }
  }
}