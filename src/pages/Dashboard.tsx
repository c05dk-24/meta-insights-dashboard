import React, { useState } from 'react';
import { Activity, Users, MousePointerClick, Eye } from 'lucide-react';
import { InsightCard } from '../components/Dashboard/InsightCard';
import { InsightsChart } from '../components/Dashboard/InsightsChart';
import { DateRangeSelector } from '../components/Dashboard/DateRangeSelector';
import { useMeta } from '../hooks/useMeta';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState('thisWeek');
  const { useInsights } = useMeta();
  const { data: insights, isLoading, error } = useInsights(dateRange);

  const formatValue = (value: number) => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value;
  };

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Failed to load insights. Please check your Meta integration settings.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meta Insights Dashboard</h1>
        <DateRangeSelector range={dateRange} onChange={setDateRange} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard
          title="Total Reach"
          value={isLoading ? '-' : formatValue(insights?.reach || 0)}
          change={8.2}
          icon={Users}
        />
        <InsightCard
          title="Impressions"
          value={isLoading ? '-' : formatValue(insights?.impressions || 0)}
          change={12.5}
          icon={Eye}
        />
        <InsightCard
          title="Engagement"
          value={isLoading ? '-' : formatValue(insights?.engagement || 0)}
          change={-2.4}
          icon={Activity}
        />
        <InsightCard
          title="Click Through"
          value={isLoading ? '-' : formatValue(insights?.clicks || 0)}
          change={15.7}
          icon={MousePointerClick}
        />
      </div>

      <InsightsChart 
        data={insights ? [insights] : []} 
        isLoading={isLoading} 
      />
    </div>
  );
};