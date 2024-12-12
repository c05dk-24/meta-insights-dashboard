import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { MetaApiClient } from '../services/meta/MetaApiClient';
import { META_API_CONFIG } from '../services/meta/config';
import { getDateRange } from '../utils/dateRanges';

export const useMeta = () => {
  const { user } = useAuth();

  const createMetaClient = () => {
    if (!user?.meta_access_token || !user?.meta_page_id) {
      throw new Error('Meta account not properly connected');
    }

    return new MetaApiClient({
      baseUrl: META_API_CONFIG.BASE_URL,
      accessToken: user.meta_access_token,
      accountId: user.meta_page_id
    });
  };

  const fetchInsights = async (range: string) => {
    try {
      const client = createMetaClient();
      const { startDate, endDate } = getDateRange(range);

      const params = {
        fields: META_API_CONFIG.FIELDS.INSIGHTS,
        time_range: {
          since: startDate,
          until: endDate
        }
      };

      const response = await client.getInsights(params);
      return response.data[0];
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['meta-insights', range],
        queryFn: () => fetchInsights(range),
        enabled: !!user?.id && !!user?.meta_page_id && !!user?.meta_access_token,
        retry: 1,
        staleTime: 5 * 60 * 1000
      })
  };
};