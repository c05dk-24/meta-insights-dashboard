import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';

export const useMeta = () => {
  const axios = useAxios();

  const fetchInsights = async (range: string) => {
    const { data } = await axios.get('/meta/ads/insights', {
      params: { range },
    });
    return data;
  };

  const fetchCampaigns = async (startDate: string, endDate: string) => {
    const { data } = await axios.get('/meta/campaigns', {
      params: { start_date: startDate, end_date: endDate },
    });
    return data;
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['insights', range],
        queryFn: () => fetchInsights(range),
      }),
    
    useCampaigns: (startDate: string, endDate: string) =>
      useQuery({
        queryKey: ['campaigns', startDate, endDate],
        queryFn: () => fetchCampaigns(startDate, endDate),
      }),
  };
};