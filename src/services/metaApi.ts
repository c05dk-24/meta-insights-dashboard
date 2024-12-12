import { AxiosInstance } from 'axios';
import { DateRange, MetaInsightsParams, InsightsResponse } from '../types/meta';

export class MetaApiService {
  constructor(private axios: AxiosInstance) {}

  async fetchInsights(params: MetaInsightsParams): Promise<InsightsResponse> {
    try {
      const { data } = await this.axios.get('/api/meta/ads/insights', {
        params: {
          page_id: params.accountId,
          start_date: params.start_date,
          end_date: params.end_date,
          fields: 'impressions,reach,actions,spend'
        }
      });

      return this.transformInsightsData(data);
    } catch (error: any) {
      console.error('Error fetching insights:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  async fetchCampaigns(accountId: string, dateRange: DateRange) {
    try {
      const { data } = await this.axios.get('/api/meta/campaigns', {
        params: {
          page_id: accountId,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          fields: 'campaign_id,campaign_name,insights'
        }
      });

      return this.transformCampaignData(data.data || []);
    } catch (error: any) {
      console.error('Error fetching campaigns:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  async fetchAdSets(accountId: string, campaignId: string, dateRange: DateRange) {
    try {
      const { data } = await this.axios.get(`/api/meta/campaigns/${campaignId}/adsets`, {
        params: {
          page_id: accountId,
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
          fields: 'adset_id,adset_name,insights'
        }
      });

      return this.transformAdSetData(data.data || []);
    } catch (error: any) {
      console.error('Error fetching ad sets:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (!error.response) {
      return new Error('Network error occurred');
    }

    const { status, data } = error.response;
    const message = data?.error?.message || data?.message || error.message;

    switch (status) {
      case 400:
        return new Error(`Invalid request parameters: ${message}`);
      case 401:
        return new Error('Authentication failed. Please reconnect your Meta account');
      case 403:
        return new Error('Not authorized to access this data');
      case 404:
        return new Error('Requested resource not found');
      default:
        return new Error(`Failed to fetch data: ${message}`);
    }
  }

  private transformInsightsData(data: any): InsightsResponse {
    // Handle both single object and array responses
    const insights = Array.isArray(data) ? data[0] : data;
    
    return {
      impressions: parseInt(insights?.impressions || '0', 10),
      leads: this.extractLeads(insights?.actions),
      costPerLead: this.calculateCostPerLead(insights?.spend, insights?.actions),
      amountSpent: parseFloat(insights?.spend || '0')
    };
  }

  private extractLeads(actions: any[] = []): number {
    if (!Array.isArray(actions)) return 0;
    
    const leadAction = actions.find(action => 
      action.action_type === 'lead' || 
      action.action_type === 'leadgen'
    );
    return parseInt(leadAction?.value || '0', 10);
  }

  private calculateCostPerLead(spend: string, actions: any[]): number {
    const leads = this.extractLeads(actions);
    const spendAmount = parseFloat(spend || '0');
    return leads > 0 ? spendAmount / leads : 0;
  }

  private transformCampaignData(campaigns: any[]) {
    if (!Array.isArray(campaigns)) return [];

    return campaigns.map(campaign => ({
      id: campaign.campaign_id,
      name: campaign.campaign_name,
      impressions: parseInt(campaign.insights?.impressions || '0', 10),
      reach: parseInt(campaign.insights?.reach || '0', 10),
      leads: this.extractLeads(campaign.insights?.actions),
      costPerLead: this.calculateCostPerLead(
        campaign.insights?.spend,
        campaign.insights?.actions
      ),
      amountSpent: parseFloat(campaign.insights?.spend || '0')
    }));
  }

  private transformAdSetData(adsets: any[]) {
    if (!Array.isArray(adsets)) return [];

    return adsets.map(adset => ({
      id: adset.adset_id,
      name: adset.adset_name,
      impressions: parseInt(adset.insights?.impressions || '0', 10),
      reach: parseInt(adset.insights?.reach || '0', 10),
      leads: this.extractLeads(adset.insights?.actions),
      costPerLead: this.calculateCostPerLead(
        adset.insights?.spend,
        adset.insights?.actions
      ),
      amountSpent: parseFloat(adset.insights?.spend || '0')
    }));
  }
}