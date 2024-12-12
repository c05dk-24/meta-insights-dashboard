import { ChartData } from './types';

export const transformInsightsData = (data: any[]): ChartData[] => {
  if (!Array.isArray(data)) return [];

  return data.map(item => ({
    month: new Date(item.date_start).toLocaleString('default', { month: 'short' }),
    leads: item.actions?.find((a: any) => a.action_type === 'lead')?.value || 0,
    amountSpent: parseFloat(item.spend || '0')
  }));
};