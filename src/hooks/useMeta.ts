import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { getDateRange } from '../utils/dateRanges';
import { DateRange } from '../types/meta';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const validateUser = () => {
    console.log('Validating user:', { 
      userId: user?.id,
      metaPageId: user?.meta_page_id,
      metaAccessToken: !!user?.meta_access_token 
    });

    if (!user?.meta_page_id) {
      throw new Error('No Meta ad account connected');
    }
    return user.meta_page_id;
  };

  const getInsights = async (range: string) => {
    try {
      const accountId = validateUser();
      const { startDate, endDate } = getDateRange(range);
      
      console.log('Fetching insights:', {
        accountId,
        startDate,
        endDate,
        hasToken: !!user?.meta_access_token
      });

      const { data } = await axios.get('/api/meta/insights', {
        params: {
          accountId,
          startDate,
          endDate,
          access_token: user?.meta_access_token
        }
      });

      console.log('Insights response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  };

  const getCampaigns = async (dateRange: DateRange) => {
    try {
      const accountId = validateUser();
      
      console.log('Fetching campaigns:', {
        accountId,
        dateRange,
        hasToken: !!user?.meta_access_token
      });

      const { data } = await axios.get('/api/meta/campaigns', {
        params: {
          accountId,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          access_token: user?.meta_access_token
        }
      });

      console.log('Campaigns response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['insights', range],
        queryFn: () => getInsights(range),
        enabled: !!user?.id && !!user?.meta_page_id && !!user?.meta_access_token,
        retry: 1,
        staleTime: 5 * 60 * 1000
      }),

    useCampaigns: (dateRange: DateRange) =>
      useQuery({
        queryKey: ['campaigns', dateRange],
        queryFn: () => getCampaigns(dateRange),
        enabled: !!user?.id && !!user?.meta_page_id && !!user?.meta_access_token,
        staleTime: 5 * 60 * 1000
      })
  };
};