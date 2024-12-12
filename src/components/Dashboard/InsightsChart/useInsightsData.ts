import { useMemo } from 'react';
import { useMeta } from '../../../hooks/useMeta';
import { transformInsightsData } from './utils';

export const useInsightsData = () => {
  const { useInsights } = useMeta();
  const { data: insights, isLoading, error } = useInsights('thisYear');

  console.log('useInsightsData - Raw:', { insights, isLoading, error });

  const transformedData = useMemo(() => {
    if (!insights) {
      console.log('No insights data available');
      return [];
    }

    console.log('Raw insights data:', insights);
    const transformed = transformInsightsData(insights);
    console.log('Transformed insights data:', transformed);
    return transformed;
  }, [insights]);

  return {
    data: transformedData,
    isLoading,
    error: error as Error | null
  };
};