import { useQuery } from '@tanstack/react-query';
import { metaApi } from '../services/api/meta';
import { getDateRange } from '../utils/dateRanges';

export const useMeta = () => {
  return {
    useInsights: (range: string) => {
      const { startDate, endDate } = getDateRange(range);
      
      return useQuery({
        queryKey: ['meta-insights', range],
        queryFn: () => metaApi.getInsights(startDate, endDate),
        staleTime: 5 * 60 * 1000 // 5 minutes
      });
    }
  };
};