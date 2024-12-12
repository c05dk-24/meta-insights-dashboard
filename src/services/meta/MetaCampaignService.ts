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
        META_API_ENDPOINTS.CAMPAIGNS,
        {
          account_id: adAccountId,
          fields: META_API_FIELDS.CAMPAIGNS,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          limit: 500
        }
      );

      return transformCampaignData(data.data || []);
    } catch (error) {
      console.error('Failed to fetch Meta campaigns:', error);
      throw new Error('Failed to fetch campaigns');
    }
  }
}