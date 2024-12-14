```typescript
import React from 'react';
import { Users, Eye, Timer, ArrowUpRight } from 'lucide-react';
import { useGoogleAnalytics } from '../../../../hooks/useGoogleAnalytics';
import { MetricCard } from './MetricCard';

export const RealTimeMetrics = () => {
  const { useRealTimeMetrics } = useGoogleAnalytics();
  const { data, isLoading } = useRealTimeMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: 'Active Users',
      value: data?.activeUsers || 0,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Page Views',
      value: data?.pageViews || 0,
      icon: Eye,
      color: 'text-green-500',
    },
    {
      title: 'Avg. Session Duration',
      value: `${Math.round(data?.avgSessionDuration || 0)}s`,
      icon: Timer,
      color: 'text-purple-500',
    },
    {
      title: 'Bounce Rate',
      value: `${data?.bounceRate.toFixed(1)}%`,
      icon: ArrowUpRight,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          color={metric.color}
        />
      ))}
    </div>
  );
};
```