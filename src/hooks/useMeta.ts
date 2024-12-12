import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { MetaApiClient } from '../services/meta/MetaApiClient';
import { MetaInsightsService } from '../services/meta/MetaInsightsService';
import { MetaCampaignService } from '../services/meta/MetaCampaignService';
import { getDateRange } from '../utils/dateRanges';

export const useMeta = () => {
  const { user } = useAuth();

  const getMetaServices = () => {
    if (!user?.meta_access_token) {
      throw new Error('Meta access token not found');
    }

    const client = new MetaApiClient(user.meta_access_token);
    return {
      insights: new MetaInsightsService(client),
      campaigns: new MetaCampaignService(client)
    };
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['meta-insights', range],
        queryFn: async () => {
          if (!user?.meta_page_id) {
            throw new Error('Meta page ID not found');
          }
          const { insights } = getMetaServices();
          return insights.getInsights(user.meta_page_id, getDateRange(range));
        },
        enabled: !!user?.meta_page_id && !!user?.meta_access_token
      }),

    useCampaigns: (dateRange: { from: Date; to: Date }) =>
      useQuery({
        queryKey: ['meta-campaigns', dateRange],
        queryFn: async () => {
          if (!user?.meta_page_id) {
            throw new Error('Meta page ID not found');
          }
          const { campaigns } = getMetaServices();
          return campaigns.getCampaigns(
            user.meta_page_id,
            {
              startDate: dateRange.from.toISOString().split('T')[0],
              endDate: dateRange.to.toISOString().split('T')[0]
            }
          );
        },
        enabled: !!user?.meta_page_id && !!user?.meta_access_token
      })
  };
};