import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const fetchInsights = async (range: string) => {
    console.log('Fetching insights with:', {
      range,
      userId: user?.id
    });

    try {
      const { data } = await axios.get('/meta/ads/insights', {
        params: { range }
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

  const fetchCampaigns = async (startDate: string, endDate: string) => {
    console.log('Fetching campaigns:', { startDate, endDate });

    try {
      const { data } = await axios.get('/meta/campaigns', {
        params: { start_date: startDate, end_date: endDate }
      });
      
      console.log('Campaigns response:', data);
      return data;
    } catch (error: any) {
      console.error('Error fetching campaigns:', {
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
        enabled: !!user?.id,
        retry: 1
      }),
    
    useCampaigns: (startDate: string, endDate: string) =>
      useQuery({
        queryKey: ['campaigns', startDate, endDate],
        queryFn: () => fetchCampaigns(startDate, endDate),
        enabled: !!user?.id,
        retry: 1
      }),
  };
};