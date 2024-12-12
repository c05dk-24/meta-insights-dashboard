import React from 'react';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';
import { InsightCard } from './InsightCard';

export const MetricCards = () => {
  const metrics = [
    {
      title: 'Total Users',
      value: '1,234',
      change: 12.5,
      icon: Users
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      change: -0.8,
      icon: TrendingUp
    },
    {
      title: 'Revenue',
      value: '$12,345',
      change: 23.1,
      icon: DollarSign
    },
    {
      title: 'Goals Met',
      value: '84%',
      change: 5.2,
      icon: Target
    }
  ];

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