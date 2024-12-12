export const getDateRange = (range: string) => {
  const today = new Date();
  let startDate: string, endDate: string;

  switch (range) {
    case 'today':
      startDate = endDate = today.toISOString().split('T')[0];
      break;
      
    case 'thisWeek':
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      startDate = weekStart.toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
      
    case 'lastWeek':
      const lastWeekEnd = new Date(today);
      lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
      const lastWeekStart = new Date(lastWeekEnd);
      lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
      startDate = lastWeekStart.toISOString().split('T')[0];
      endDate = lastWeekEnd.toISOString().split('T')[0];
      break;
      
    case 'thisMonth':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
      
    case 'thisYear':
      startDate = new Date(today.getFullYear(), 0, 1)
        .toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
      
    default:
      startDate = new Date(today.getFullYear(), 0, 1)
        .toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
  }

  return { startDate, endDate };
};

export const aggregateInsights = (data: any[]) => {
  return data.reduce(
    (acc, item) => ({
      impressions: acc.impressions + (item.impressions || 0),
      reach: acc.reach + (item.reach || 0),
      leads: acc.leads + (item.results || 0),
      amountSpent: acc.amountSpent + (parseFloat(item.spend) || 0),
      costPerLead: acc.leads > 0 ? acc.amountSpent / acc.leads : 0
    }),
    { impressions: 0, reach: 0, leads: 0, amountSpent: 0, costPerLead: 0 }
  );
};