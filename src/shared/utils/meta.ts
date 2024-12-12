import { MetaInsight } from '../../types/meta';

export const aggregateInsights = (data: MetaInsight[]) => {
  return data.reduce(
    (acc, item) => ({
      impressions: acc.impressions + (item.impressions || 0),
      reach: acc.reach + (item.reach || 0),
      leads: acc.leads + (item.results || 0),
      amountSpent: acc.amountSpent + (parseFloat(item.amountSpent.toString()) || 0),
      costPerLead: acc.leads > 0 ? acc.amountSpent / acc.leads : 0
    }),
    { impressions: 0, reach: 0, leads: 0, amountSpent: 0, costPerLead: 0 }
  );
};