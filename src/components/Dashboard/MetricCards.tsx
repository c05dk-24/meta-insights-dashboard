import React from 'react';
import { Target, PoundSterling, Users, Eye } from 'lucide-react';
import { InsightCard } from './InsightCard';
import { MetaInsight } from '../../types/meta';
import { formatCurrency, formatNumber } from '../../utils/metrics';

interface Props {
  insights: MetaInsight | null;
  isLoading: boolean;
}

export const MetricCards: React.FC<Props> = ({ insights, isLoading }) => {
  const metrics = [
    {
      title: 'Results',
      value: insights ? formatNumber(insights.results) : '0',
      change: 0,
      icon: Target
    },
    {
      title: 'Cost per Result',
      value: insights ? formatCurrency(insights.costPerResult) : '£0.00',
      change: 0,
      icon: PoundSterling
    },
    {
      title: 'Amount Spent',
      value: insights ? formatCurrency(insights.amountSpent) : '£0.00',
      change: 0,
      icon: PoundSterling
    },
    {
      title: 'Impressions',
      value: insights ? formatNumber(insights.impressions) : '0',
      change: 0,
      icon: Eye
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
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