import { Campaign } from '../../../types/meta';
import { extractLeads, calculateCostPerLead } from '../utils/metrics';

export const transformCampaignData = (campaigns: any[]): Campaign[] => {
  if (!Array.isArray(campaigns)) return [];

  return campaigns.map(campaign => ({
    id: campaign.campaign_id,
    name: campaign.campaign_name,
    objective: campaign.objective,
    status: campaign.status,
    impressions: parseInt(campaign.insights?.impressions || '0', 10),
    reach: parseInt(campaign.insights?.reach || '0', 10),
    leads: extractLeads(campaign.insights?.actions),
    costPerLead: calculateCostPerLead(
      campaign.insights?.spend,
      campaign.insights?.actions
    ),
    amountSpent: parseFloat(campaign.insights?.spend || '0')
  }));
};