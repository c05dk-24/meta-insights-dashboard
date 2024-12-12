import { useMemo } from 'react';
import { useMeta } from '../../../hooks/useMeta';
import { transformInsightsData } from './utils';

export const useInsightsData = () => {
  const { useInsights } = useMeta();
  const { data: insights, isLoading, error } = useInsights('thisYear');

  console.log('InsightsChart - Raw data:', { insights, isLoading, error });

  const chartData = useMemo(() => {
    if (!insights?.data) return [];
    return transformInsightsData(insights.data);
  }, [insights]);

  return {
    data: chartData,
    isLoading,
    error: error as Error | null
  };
};