import { InsightsResponse, Campaign, AdSet } from '../../types/meta';
import { extractLeads, calculateCostPerLead } from './utils/metrics';

export class MetaDataTransformer {
  static transformInsights(data: any): InsightsResponse {
    const insights = Array.isArray(data) ? data[0] : data;
    
    return {
      impressions: parseInt(insights?.impressions || '0', 10),
      leads: extractLeads(insights?.actions),
      costPerLead: calculateCostPerLead(insights?.spend, insights?.actions),
      amountSpent: parseFloat(insights?.spend || '0')
    };
  }

  static transformCampaigns(campaigns: any[]): Campaign[] {
    if (!Array.isArray(campaigns)) return [];

    return campaigns.map(campaign => ({
      id: campaign.campaign_id,
      name: campaign.campaign_name,
      impressions: parseInt(campaign.insights?.impressions || '0', 10),
      reach: parseInt(campaign.insights?.reach || '0', 10),
      leads: extractLeads(campaign.insights?.actions),
      costPerLead: calculateCostPerLead(
        campaign.insights?.spend,
        campaign.insights?.actions
      ),
      amountSpent: parseFloat(campaign.insights?.spend || '0')
    }));
  }

  static transformAdSets(adsets: any[]): AdSet[] {
    if (!Array.isArray(adsets)) return [];

    return adsets.map(adset => ({
      id: adset.adset_id,
      name: adset.adset_name,
      impressions: parseInt(adset.insights?.impressions || '0', 10),
      reach: parseInt(adset.insights?.reach || '0', 10),
      leads: extractLeads(adset.insights?.actions),
      costPerLead: calculateCostPerLead(
        adset.insights?.spend,
        adset.insights?.actions
      ),
      amountSpent: parseFloat(adset.insights?.spend || '0')
    }));
  }
}