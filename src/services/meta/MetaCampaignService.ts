import { AxiosInstance } from 'axios';
import { Campaign, DateRange } from '../../types/meta';
import { transformCampaignData } from './transformers/campaignTransformer';

export class MetaCampaignService {
  constructor(private axios: AxiosInstance) {}

  async getCampaigns(accountId: string, dateRange: DateRange): Promise<Campaign[]> {
    try {
      const { data } = await this.axios.get('/api/meta/campaigns', {
        params: {
          start_date: dateRange.startDate,
          end_date: dateRange.endDate
        }
      });

      return transformCampaignData(data.data || []);
    } catch (error: any) {
      console.error('MetaCampaignService.getCampaigns error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch campaigns');
    }
  }
}