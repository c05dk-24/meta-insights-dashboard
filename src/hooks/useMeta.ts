import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const fetchInsights = async (range: string) => {
    console.log('Fetching insights:', {
      range,
      userId: user?.id,
      metaPageId: user?.meta_page_id
    });

    if (!user?.meta_page_id) {
      throw new Error('No Meta ad account connected. Please add your Meta page ID in settings.');
    }

    try {
      const { data } = await axios.get('/meta/ads/insights', {
        params: { 
          accountId: user.meta_page_id,
          fields: 'impressions,actions,spend,action_values',
          time_range: range === 'thisYear' ? {
            since: `${new Date().getFullYear()}-01-01`,
            until: new Date().toISOString().split('T')[0]
          } : range
        }
      });
      
      console.log('Insights response:', data);

      // Transform the data
      const leads = data.actions?.find((a: any) => a.action_type === 'lead')?.value || 0;
      const spend = parseFloat(data.spend || 0);

      return {
        impressions: parseInt(data.impressions || 0),
        leads,
        costPerLead: leads > 0 ? spend / leads : 0,
        amountSpent: spend
      };
    } catch (error: any) {
      console.error('Error fetching insights:', {
        error: error.response?.data || error.message,
        status: error.response?.status
      });
      throw error;
    }
  };

  const fetchYearlyData = async () => {
    if (!user?.meta_page_id) {
      throw new Error('No Meta ad account connected');
    }

    const year = new Date().getFullYear();
    const startDate = `${year}-01-01`;
    const endDate = new Date().toISOString().split('T')[0];

    try {
      const { data } = await axios.get('/meta/ads/insights', {
        params: {
          accountId: user.meta_page_id,
          fields: 'impressions,actions,spend,action_values',
          time_range: { since: startDate, until: endDate },
          time_increment: 1,
          date_preset: 'this_year'
        }
      });

      // Transform daily data into monthly aggregates
      const monthlyData = data.data.reduce((acc: any[], day: any) => {
        const month = new Date(day.date_start).toLocaleString('default', { month: 'short' });
        const monthIndex = acc.findIndex(m => m.month === month);
        
        const leads = day.actions?.find((a: any) => a.action_type === 'lead')?.value || 0;
        const spend = parseFloat(day.spend || 0);

        if (monthIndex === -1) {
          acc.push({ month, leads, amountSpent: spend });
        } else {
          acc[monthIndex].leads += leads;
          acc[monthIndex].amountSpent += spend;
        }
        
        return acc;
      }, []);

      console.log('Monthly data:', monthlyData);
      return monthlyData;
    } catch (error) {
      console.error('Error fetching yearly data:', error);
      throw error;
    }
  };

  const fetchCampaigns = async (dateRange: { from: Date; to: Date }) => {
    if (!user?.meta_page_id) {
      throw new Error('No Meta ad account connected');
    }

    try {
      const { data } = await axios.get('/meta/campaigns', {
        params: {
          accountId: user.meta_page_id,
          fields: 'name,status,insights{impressions,reach,actions,spend}',
          time_range: {
            since: dateRange.from.toISOString().split('T')[0],
            until: dateRange.to.toISOString().split('T')[0]
          }
        }
      });

      return data.data.map((campaign: any) => {
        const insights = campaign.insights?.data?.[0] || {};
        const leads = insights.actions?.find((a: any) => a.action_type === 'lead')?.value || 0;
        const spend = parseFloat(insights.spend || 0);

        return {
          id: campaign.id,
          name: campaign.name,
          status: campaign.status,
          impressions: parseInt(insights.impressions || 0),
          reach: parseInt(insights.reach || 0),
          leads,
          costPerLead: leads > 0 ? spend / leads : 0,
          amountSpent: spend
        };
      });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['insights', range],
        queryFn: () => fetchInsights(range),
        enabled: !!user?.id && !!user?.meta_page_id,
        retry: 1
      }),

    useYearlyData: () =>
      useQuery({
        queryKey: ['yearlyData'],
        queryFn: fetchYearlyData,
        enabled: !!user?.id && !!user?.meta_page_id,
        staleTime: 1000 * 60 * 60 // 1 hour
      }),

    useCampaigns: (dateRange: { from: Date; to: Date }) =>
      useQuery({
        queryKey: ['campaigns', dateRange.from, dateRange.to],
        queryFn: () => fetchCampaigns(dateRange),
        enabled: !!user?.id && !!user?.meta_page_id
      })
  };
};