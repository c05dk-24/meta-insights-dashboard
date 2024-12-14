import { ChartData } from './types';
import { MetaInsight } from '../../../types/meta';

export const transformInsightsData = (insights: MetaInsight[]): ChartData[] => {
  if (!Array.isArray(insights)) {
    console.warn('Invalid insights data:', insights);
    return [];
  }

  const monthlyData = insights.reduce<Record<string, ChartData>>((acc, item) => {
    const date = new Date(item.date_start || item.date);
    const month = date.toLocaleString('default', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = {
        month,
        leads: 0,
        amountSpent: 0,
        impressions: 0,
        reach: 0
      };
    }

    // Add values to monthly totals
    acc[month].leads += item.leads;
    acc[month].amountSpent += parseFloat(item.spend || '0');
    acc[month].impressions += item.impressions;
    acc[month].reach += item.reach;

    return acc;
  }, {});

  // Sort by month
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return Object.values(monthlyData).sort((a, b) => 
    months.indexOf(a.month) - months.indexOf(b.month)
  );
};