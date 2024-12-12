import React, { useState } from 'react';
import { MetricCards } from '../components/Dashboard/MetricCards';
import { InsightsChart } from '../components/Dashboard/InsightsChart';
import { DateRangeSelector } from '../components/Dashboard/DateRangeSelector';
import { CampaignSection } from '../components/Dashboard/CampaignSection';
import { useMeta } from '../hooks/useMeta';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState('thisWeek');
  const { useInsights } = useMeta();
  const { data: insights, isLoading } = useInsights(dateRange);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Meta Insights Dashboard</h1>
        <DateRangeSelector range={dateRange} onChange={setDateRange} />
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        <MetricCards insights={insights} isLoading={isLoading} />
        <InsightsChart />
        <CampaignSection />
      </div>
    </div>
  );
};