import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { MetaConnectionService } from '../services/meta/MetaConnectionService';
import { MetaInsightsService } from '../services/meta/MetaInsightsService';
import { getDateRange } from '../utils/dateRanges';

export const useMeta = () => {
  const axios = useAxios();
  const { user } = useAuth();
  
  const connectionService = new MetaConnectionService(axios);
  const insightsService = new MetaInsightsService(axios);

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['meta-insights', range],
        queryFn: async () => {
          if (!user?.meta_page_id) {
            throw new Error('No Meta account connected');
          }

          return insightsService.getInsights(
            user.meta_page_id,
            getDateRange(range)
          );
        },
        enabled: !!user?.meta_page_id,
        retry: 1
      })
  };
};