import React, { useState } from 'react';
import { Activity, Users, MousePointerClick, Eye } from 'lucide-react';
import { InsightCard } from '../components/Dashboard/InsightCard';
import { InsightsChart } from '../components/Dashboard/InsightsChart';
import { DateRangeSelector } from '../components/Dashboard/DateRangeSelector';
import { useMeta } from '../hooks/useMeta';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState('thisWeek');
  const { useInsights } = useMeta();
  const { data: insights, isLoading } = useInsights(dateRange);

  const formatValue = (value: number) => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Meta Insights Dashboard</h1>
        <DateRangeSelector range={dateRange} onChange={setDateRange} />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InsightCard
            title="Total Reach"
            value={formatValue(insights?.reach || 0)}
            change={12.5}
            icon={Users}
          />
          <InsightCard
            title="Impressions"
            value={formatValue(insights?.impressions || 0)}
            change={8.2}
            icon={Eye}
          />
          <InsightCard
            title="Engagement"
            value={formatValue(insights?.engagement || 0)}
            change={-2.4}
            icon={Activity}
          />
          <InsightCard
            title="Click Through"
            value={formatValue(insights?.clicks || 0)}
            change={15.7}
            icon={MousePointerClick}
          />
        </div>
      )}

      <div className="mb-8">
        <InsightsChart />
      </div>
    </div>
  );
};