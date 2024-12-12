import { ChartData } from './types';

export const transformInsightsData = (data: any): ChartData[] => {
  if (!data?.data) {
    console.warn('Invalid insights data:', data);
    return [];
  }

  console.log('Transforming insights data:', data.data);

  // Group data by month
  const monthlyData = data.data.reduce((acc: Record<string, ChartData>, item: any) => {
    const date = new Date(item.date_start);
    const month = date.toLocaleString('default', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = {
        month,
        leads: 0,
        amountSpent: 0
      };
    }

    // Extract leads from actions array
    const leads = item.actions?.find((a: any) => 
      a.action_type === 'lead' || 
      a.action_type === 'leadgen' ||
      a.action_type === 'onsite_conversion.lead_grouped'
    )?.value || 0;

    // Add values to monthly totals
    acc[month].leads += parseInt(leads, 10);
    acc[month].amountSpent += parseFloat(item.spend || '0');

    return acc;
  }, {});

  // Convert to array and sort by month
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result = Object.values(monthlyData).sort((a, b) => 
    months.indexOf(a.month) - months.indexOf(b.month)
  );

  console.log('Transformed insights data:', result);
  return result;
};