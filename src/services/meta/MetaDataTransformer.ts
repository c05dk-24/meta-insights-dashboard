import { InsightsResponse, Campaign, AdSet } from '../../types/meta';
import { extractLeads, calculateCostPerLead } from './utils/metrics';

export class MetaDataTransformer {
  static transformInsights(data: any): InsightsResponse {
    const insights = Array.isArray(data) ? data[0] : data;
    
    return {
      impressions: Number(insights?.impressions || 0),
      leads: extractLeads(insights?.actions),
      costPerLead: calculateCostPerLead(insights?.spend, insights?.actions),
      amountSpent: Number(insights?.spend || 0)
    };
  }

  static transformCampaigns(campaigns: any[]): Campaign[] {
    if (!Array.isArray(campaigns)) return [];

    return campaigns.map(campaign => ({
      id: String(campaign.campaign_id),
      name: String(campaign.campaign_name),
      impressions: Number(campaign.insights?.impressions || 0),
      reach: Number(campaign.insights?.reach || 0),
      leads: extractLeads(campaign.insights?.actions),
      costPerLead: calculateCostPerLead(
        campaign.insights?.spend,
        campaign.insights?.actions
      ),
      amountSpent: Number(campaign.insights?.spend || 0)
    }));
  }
}