```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { AnalyticsConfig, AnalyticsMetrics, DateRange } from '../types/analytics';

export const useGoogleAnalytics = () => {
  const axios = useAxios();

  const connectAnalytics = async (config: AnalyticsConfig) => {
    const { data } = await axios.post('/analytics/connect', config);
    return data;
  };

  return {
    useRealTimeMetrics: () =>
      useQuery({
        queryKey: ['analytics', 'realtime'],
        queryFn: async () => {
          const { data } = await axios.get('/analytics/realtime');
          return data as AnalyticsMetrics;
        },
        refetchInterval: 30000, // Refresh every 30 seconds
      }),

    useHistoricalMetrics: (dateRange: DateRange) =>
      useQuery({
        queryKey: ['analytics', 'historical', dateRange],
        queryFn: async () => {
          const { data } = await axios.get('/analytics/historical', {
            params: {
              startDate: dateRange.startDate.toISOString(),
              endDate: dateRange.endDate.toISOString(),
            },
          });
          return data as AnalyticsMetrics;
        },
      }),

    useConnect: () =>
      useMutation({
        mutationFn: connectAnalytics,
      }),
  };
};
```