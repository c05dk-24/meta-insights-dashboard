import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { getDateRange } from '../utils/dateRanges';
import { API_PATHS, META_API_CONFIG } from '../utils/config';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const getInsights = async (range: string) => {
    if (!user?.meta_page_id) {
      throw new Error('Meta page ID not found');
    }

    const { startDate, endDate } = getDateRange(range);
    
    console.log('Fetching Meta insights:', {
      pageId: user.meta_page_id,
      startDate,
      endDate,
      range
    });

    try {
      const { data } = await axios.get(API_PATHS.META.INSIGHTS, {
        params: {
          fields: META_API_CONFIG.FIELDS.INSIGHTS,
          page_id: user.meta_page_id,
          start_date: startDate,
          end_date: endDate
        }
      });

      console.log('Meta insights response:', data);
      return data;
    } catch (error: any) {
      console.error('Error fetching insights:', error.response?.data || error);
      throw error;
    }
  };

  const getCampaigns = async (dateRange: { from: Date; to: Date }) => {
    if (!user?.meta_page_id) {
      throw new Error('Meta page ID not found');
    }

    console.log('Fetching Meta campaigns:', {
      pageId: user.meta_page_id,
      startDate: dateRange.from,
      endDate: dateRange.to
    });

    try {
      const { data } = await axios.get(API_PATHS.META.CAMPAIGNS, {
        params: {
          fields: META_API_CONFIG.FIELDS.CAMPAIGNS,
          page_id: user.meta_page_id,
          start_date: dateRange.from.toISOString().split('T')[0],
          end_date: dateRange.to.toISOString().split('T')[0]
        }
      });

      console.log('Meta campaigns response:', data);
      return data;
    } catch (error: any) {
      console.error('Error fetching campaigns:', error.response?.data || error);
      throw error;
    }
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['meta-insights', range],
        queryFn: () => getInsights(range),
        enabled: !!user?.id && !!user?.meta_page_id,
        retry: 1,
        staleTime: 5 * 60 * 1000
      }),

    useCampaigns: (dateRange: { from: Date; to: Date }) =>
      useQuery({
        queryKey: ['meta-campaigns', dateRange.from, dateRange.to],
        queryFn: () => getCampaigns(dateRange),
        enabled: !!user?.id && !!user?.meta_page_id
      })
  };
};