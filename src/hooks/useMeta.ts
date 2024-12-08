import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { MetaInsight } from '../types/meta';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const fetchInsights = async (range: string): Promise<MetaInsight> => {
    console.log('Fetching insights:', {
      range,
      metaPageId: user?.meta_page_id
    });

    if (!user?.meta_page_id) {
      throw new Error('No Meta ad account connected');
    }

    try {
      const { data } = await axios.get('/meta/insights', {
        params: { 
          range,
          accountId: user.meta_page_id.replace('act_', '')
        }
      });
      
      console.log('Insights response:', data);
      return data;
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

    try {
      const { data } = await axios.get('/meta/insights/yearly', {
        params: {
          accountId: user.meta_page_id.replace('act_', '')
        }
      });

      console.log('Yearly data response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching yearly data:', error);
      throw error;
    }
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['insights', range],
        queryFn: () => fetchInsights(range),
        enabled: Boolean(user?.meta_page_id),
        retry: 1
      }),

    useYearlyData: () =>
      useQuery({
        queryKey: ['yearlyData'],
        queryFn: fetchYearlyData,
        enabled: Boolean(user?.meta_page_id),
        staleTime: 1000 * 60 * 60 // 1 hour
      })
  };
};