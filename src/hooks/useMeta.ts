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
          try {
            const accountId = validateUser();
            const { startDate, endDate } = getDateRange(range);
            return metaService.getInsights({ 
              accountId, 
              start_date: startDate,
              end_date: endDate,
              access_token: user?.meta_access_token
            });
          } catch (error) {
            console.error('useInsights error:', error);
            throw error;
          }
        },
        enabled: !!user?.id && !!user?.meta_page_id && !!user?.meta_access_token,
        retry: 1,
        staleTime: 5 * 60 * 1000
      }),

    useCampaigns: (dateRange: DateRange) =>
      useQuery({
        queryKey: ['campaigns', dateRange],
        queryFn: async () => {
          try {
            const accountId = validateUser();
            return metaService.getCampaigns(accountId, dateRange);
          } catch (error) {
            console.error('useCampaigns error:', error);
            throw error;
          }
        },
        enabled: !!user?.id && !!user?.meta_page_id && !!user?.meta_access_token,
        staleTime: 5 * 60 * 1000
      }),

    useAdSets: (dateRange: DateRange, campaignId: string | null) =>
      useQuery({
        queryKey: ['adsets', dateRange, campaignId],
        queryFn: async () => {
          try {
            const accountId = validateUser();
            if (!campaignId) return null;
            return metaService.getAdSets(accountId, campaignId, dateRange);
          } catch (error) {
            console.error('useAdSets error:', error);
            throw error;
          }
        },
        enabled: !!user?.id && !!user?.meta_page_id && !!user?.meta_access_token && !!campaignId,
        staleTime: 5 * 60 * 1000
      })
  };
};