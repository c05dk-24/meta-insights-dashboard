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
        META_API_ENDPOINTS.INSIGHTS,
        {
          page_id: pageId,
          fields: META_API_FIELDS.INSIGHTS,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate
        }
      );

      return transformInsightsData(data.data || []);
    } catch (error) {
      console.error('Failed to fetch Meta insights:', error);
      throw new Error('Failed to fetch insights');
    }
  }
}