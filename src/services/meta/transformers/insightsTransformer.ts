import { InsightsResponse } from '../../../types/meta';

export const transformInsightsData = (data: any): InsightsResponse => {
  // Handle the actual response format we're getting from the API
  return {
    impressions: parseInt(data.impressions || '0', 10),
    reach: parseInt(data.reach || '0', 10),
    leads: 0, // Since we're not getting this in the current response
    costPerLead: 0, // Calculate if we have leads data
    amountSpent: parseFloat(data.spend || '0')
  };
};