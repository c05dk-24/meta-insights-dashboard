import { MetaApiClient } from './MetaApiClient';
import { META_API_ENDPOINTS } from './config/endpoints';
import { META_API_FIELDS } from './config/fields';
import { Campaign, DateRange } from '../../types/meta';
import { transformCampaignData } from './transformers/campaignTransformer';

export class MetaCampaignService {
  constructor(private client: MetaApiClient) {}

  async getCampaigns(adAccountId: string, dateRange: DateRange): Promise<Campaign[]> {
    try {
      const data = await this.client.get(
        META_API_ENDPOINTS.CAMPAIGNS(adAccountId),
        {
          fields: META_API_FIELDS.CAMPAIGNS,
          time_range: JSON.stringify({
            since: dateRange.startDate,
            until: dateRange.endDate
          }),
          limit: 500 // Meta's recommended limit per page
        }
      );

      return transformCampaignData(data.data || []);
    } catch (error) {
      console.error('Failed to fetch Meta campaigns:', error);
      throw error;
    }
  }
}