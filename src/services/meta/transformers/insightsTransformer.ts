import { InsightsResponse } from '../../../types/meta';
import { extractLeads, calculateCostPerLead } from '../utils/metrics';

export const transformInsightsData = (data: any): InsightsResponse => {
  const insights = Array.isArray(data) ? data[0] : data;
  
  return {
    impressions: parseInt(insights?.impressions || '0', 10),
    reach: parseInt(insights?.reach || '0', 10),
    leads: extractLeads(insights?.actions),
    costPerLead: calculateCostPerLead(insights?.spend, insights?.actions),
    amountSpent: parseFloat(insights?.spend || '0')
  };
};