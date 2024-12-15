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
    useConnection: () => 
      useQuery({
        queryKey: ['meta-connection', user?.meta_page_id],
        queryFn: () => connectionService.verifyConnection(user?.meta_page_id || ''),
        enabled: !!user?.meta_page_id
      }),

    useAccounts: () =>
      useQuery({
        queryKey: ['meta-accounts'],
        queryFn: () => connectionService.getConnectedAccounts()
      }),

    useInsights: (range: string) => 
      useQuery({
        queryKey: ['meta-insights', range],
        queryFn: async () => {
          if (!user?.meta_page_id) {
            throw new Error('No Meta account connected');
          }

          const isValid = await connectionService.verifyConnection(user.meta_page_id);
          if (!isValid) {
            throw new Error('Meta account connection is invalid. Please reconnect your account.');
          }

          return insightsService.getInsights(
            user.meta_page_id,
            getDateRange(range)
          );
        },
        enabled: !!user?.meta_page_id
      })
  };
};