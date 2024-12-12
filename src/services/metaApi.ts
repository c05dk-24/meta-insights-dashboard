import { AxiosInstance } from 'axios';
import { DateRange, MetaInsightsParams, InsightsResponse } from '../types/meta';

export class MetaApiService {
  constructor(private axios: AxiosInstance) {}

  async fetchInsights(params: MetaInsightsParams): Promise<InsightsResponse> {
    try {
      const { data } = await this.axios.get('/meta/ads/insights', { params });
      return {
        impressions: data.impressions || 0,
        leads: data.results || 0,
        costPerLead: data.costPerResult || 0,
        amountSpent: data.amountSpent || 0
      };
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  }

  async fetchCampaigns(accountId: string, dateRange: DateRange) {
    try {
      const { data } = await this.axios.get('/meta/ads/insights', {
        params: {
          accountId,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          level: 'campaign'
        }
      });
      return this.transformCampaignData(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  async fetchAdSets(accountId: string, campaignId: string, dateRange: DateRange) {
    try {
      const { data } = await this.axios.get('/meta/ads/insights', {
        params: {
          accountId,
          campaignId,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          level: 'adset'
        }
      });
      return this.transformAdSetData(data);
    } catch (error) {
      console.error('Error fetching ad sets:', error);
      throw error;
    }
  }

  private transformCampaignData(data: any[]) {
    return data.map(campaign => ({
      id: campaign.campaign_id,
      name: campaign.campaign_name,
      impressions: campaign.impressions || 0,
      reach: campaign.reach || 0,
      leads: campaign.results || 0,
      costPerLead: campaign.cost_per_result || 0,
      amountSpent: campaign.spend || 0
    }));
  }

  private transformAdSetData(data: any[]) {
    return data.map(adset => ({
      id: adset.adset_id,
      name: adset.adset_name,
      impressions: adset.impressions || 0,
      reach: adset.reach || 0,
      leads: adset.results || 0,
      costPerLead: adset.cost_per_result || 0,
      amountSpent: adset.spend || 0
    }));
  }
}