import { useMeta } from '../../../hooks/useMeta';
import { transformInsightsData } from './utils';

export const useInsightsData = () => {
  const { useInsights } = useMeta();
  const { data: insights, isLoading, error } = useInsights('thisYear');

  const transformedData = insights?.data 
    ? transformInsightsData(insights.data)
    : [];

  return {
    data: transformedData,
    isLoading,
    error: error as Error | null
  };
};