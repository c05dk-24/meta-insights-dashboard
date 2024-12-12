import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { MetaInsightsService } from '../services/meta/MetaInsightsService';
import { MetaCampaignService } from '../services/meta/MetaCampaignService';
import { getDateRange } from '../utils/dateRanges';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();
  
  const insightsService = new MetaInsightsService(axios);
  const campaignService = new MetaCampaignService(axios);

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['meta-insights', range],
        queryFn: async () => {
          if (!user?.meta_page_id) throw new Error('No Meta account connected');
          return insightsService.getInsights(
            user.meta_page_id,
            getDateRange(range)
          );
        },
        enabled: !!user?.meta_page_id
      }),

    useCampaigns: (dateRange: { from: Date; to: Date }) =>
      useQuery({
        queryKey: ['meta-campaigns', dateRange],
        queryFn: async () => {
          if (!user?.meta_page_id) throw new Error('No Meta account connected');
          return campaignService.getCampaigns(
            user.meta_page_id,
            {
              startDate: dateRange.from.toISOString().split('T')[0],
              endDate: dateRange.to.toISOString().split('T')[0]
            }
          );
        },
        enabled: !!user?.meta_page_id
      })
  };
};