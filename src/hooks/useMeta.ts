import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { getDateRange } from '../utils/dateRanges';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const getInsights = async (range: string) => {
    console.log('MetaApiClient.getInsights - Params:', {
      accountId: user?.meta_page_id,
      ...getDateRange(range)
    });

    const { startDate, endDate } = getDateRange(range);
    
    const params = {
      fields: 'impressions,reach,actions,spend',
      page_id: user?.meta_page_id,
      time_range: JSON.stringify({
        since: startDate,
        until: endDate
      })
    };

    console.log('MetaApiClient.getInsights - Query params:', params);

    const { data } = await axios.get('/meta/ads/insights', { params });
    return data;
  };

  const getCampaigns = async (dateRange: { from: Date; to: Date }) => {
    console.log('MetaApiClient.getCampaigns - Params:', {
      accountId: user?.meta_page_id,
      dateRange
    });

    const params = {
      fields: 'campaign_id,campaign_name,insights',
      page_id: user?.meta_page_id,
      time_range: JSON.stringify({
        since: dateRange.from.toISOString().split('T')[0],
        until: dateRange.to.toISOString().split('T')[0]
      }),
      level: 'campaign'
    };

    console.log('MetaApiClient.getCampaigns - Query params:', params);

    const { data } = await axios.get('/meta/ads/insights', { params });
    return data;
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