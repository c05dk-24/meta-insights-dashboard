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
          range,
          accountId: user.meta_page_id
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

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['insights', range],
        queryFn: () => fetchInsights(range),
        enabled: !!user?.id && !!user?.meta_page_id,
        retry: 1
      })
  };
};