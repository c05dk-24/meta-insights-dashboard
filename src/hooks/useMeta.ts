import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { MetaApiService } from '../services/metaApi';
import { getDateRange } from '../utils/dateRanges';
import { DateRange } from '../types/meta';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const metaApi = new MetaApiService(axios);

  const validateUser = () => {
    if (!user?.meta_page_id) {
      throw new Error('No Meta ad account connected');
    }
    return user.meta_page_id;
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['insights', range],
        queryFn: async () => {
          const accountId = validateUser();
          const dateRange = getDateRange(range);
          return metaApi.fetchInsights({ 
            accountId, 
            start_date: dateRange.startDate,
            end_date: dateRange.endDate 
          });
        },
        enabled: !!user?.id && !!user?.meta_page_id,
        retry: 1
      }),

    useCampaigns: (dateRange: DateRange) =>
      useQuery({
        queryKey: ['campaigns', dateRange],
        queryFn: async () => {
          const accountId = validateUser();
          return metaApi.fetchCampaigns(accountId, dateRange);
        },
        enabled: !!user?.id && !!user?.meta_page_id
      }),

    useAdSets: (dateRange: DateRange, campaignId: string | null) =>
      useQuery({
        queryKey: ['adsets', dateRange, campaignId],
        queryFn: async () => {
          const accountId = validateUser();
          if (!campaignId) return null;
          return metaApi.fetchAdSets(accountId, campaignId, dateRange);
        },
        enabled: !!user?.id && !!user?.meta_page_id && !!campaignId
      })
  };
};