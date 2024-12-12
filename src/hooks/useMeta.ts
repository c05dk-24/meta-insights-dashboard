import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { MetaService } from '../services/meta/MetaService';
import { getDateRange } from '../utils/dateRanges';
import { DateRange } from '../types/meta';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const metaService = new MetaService(axios);

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
          const { startDate, endDate } = getDateRange(range);
          return metaService.getInsights({ 
            accountId, 
            start_date: startDate,
            end_date: endDate 
          });
        },
        enabled: !!user?.id && !!user?.meta_page_id,
        retry: 1,
        staleTime: 5 * 60 * 1000
      }),

    useCampaigns: (dateRange: DateRange) =>
      useQuery({
        queryKey: ['campaigns', dateRange],
        queryFn: async () => {
          const accountId = validateUser();
          return metaService.getCampaigns(accountId, dateRange);
        },
        enabled: !!user?.id && !!user?.meta_page_id,
        staleTime: 5 * 60 * 1000
      }),

    useAdSets: (dateRange: DateRange, campaignId: string | null) =>
      useQuery({
        queryKey: ['adsets', dateRange, campaignId],
        queryFn: async () => {
          const accountId = validateUser();
          if (!campaignId) return null;
          return metaService.getAdSets(accountId, campaignId, dateRange);
        },
        enabled: !!user?.id && !!user?.meta_page_id && !!campaignId,
        staleTime: 5 * 60 * 1000
      })
  };
};