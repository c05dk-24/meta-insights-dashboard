import React from 'react';
import { Target, PoundSterling, Users, TrendingUp } from 'lucide-react';
import { InsightCard } from './InsightCard';
import { ConnectionError } from './ConnectionError';
import { MetaInsight } from '../../types/meta';
import { formatNumber, formatCurrency } from '../../utils/metrics';
import { useMeta } from '../../hooks/useMeta';

interface Props {
  insights: MetaInsight | null;
  isLoading: boolean;
  error?: Error | null;
}

export const MetricCards: React.FC<Props> = ({ insights, isLoading, error }) => {
  const { useConnection } = useMeta();
  const { data: isValidConnection } = useConnection();

  if (error) {
    return <ConnectionError message={error.message} />;
  }

  if (!isValidConnection && !isLoading) {
    return (
      <ConnectionError 
        message="Your Meta account connection needs to be refreshed. Please reconnect your account in settings."
      />
    );
  }

  const metrics = [
    {
      title: 'Total Leads',
      value: insights ? formatNumber(insights.leads) : '0',
      change: 0,
      icon: Users
    },
    {
      title: 'Cost per Lead',
      value: insights ? formatCurrency(insights.costPerLead) : '£0.00',
      change: 0,
      icon: Target
    },
    {
      title: 'Amount Spent',
      value: insights ? formatCurrency(insights.amountSpent) : '£0.00',
      change: 0,
      icon: PoundSterling
    },
    {
      title: 'Conversion Rate',
      value: insights ? 
        `${((insights.leads / insights.impressions) * 100).toFixed(2)}%` : 
        '0%',
      change: 0,
      icon: TrendingUp
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {metrics.map((metric, index) => (
        <InsightCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
        />
      ))}
    </div>
  );
};