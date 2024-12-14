import { useQuery } from '@tanstack/react-query';
import { useMetaService } from './useMetaService';
import { DateRange, InsightsResponse } from '../../types/meta';

export const useMeta = () => {
  const metaService = useMetaService();

  return {
    useInsights: (range: string) => 
      useQuery<InsightsResponse, Error>({
        queryKey: ['meta-insights', range],
        queryFn: () => metaService.getInsights(range),
        enabled: metaService.isEnabled(),
        retry: 1,
        staleTime: 5 * 60 * 1000
      }),

    useCampaigns: (dateRange: DateRange) =>
      useQuery({
        queryKey: ['meta-campaigns', dateRange],
        queryFn: () => metaService.getCampaigns({
          from: dateRange.from,
          to: dateRange.to
        }),
        enabled: metaService.isEnabled()
      }),

    useAdSets: (campaignId: string | null, dateRange: DateRange) =>
      useQuery({
        queryKey: ['meta-adsets', campaignId, dateRange],
        queryFn: () => metaService.getCampaigns({
          from: dateRange.from,
          to: dateRange.to
        }),
        enabled: metaService.isEnabled() && !!campaignId
      })
  };
};