import React, { useState } from 'react';
import { DateRangeSelector } from '../components/Dashboard/DateRangeSelector';
import { MetricCards } from '../components/Dashboard/MetricCards';
import { InsightsChart } from '../components/Dashboard/InsightsChart';
import { CampaignSection } from '../components/Dashboard/CampaignSection';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState('thisWeek');

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Analytics Dashboard</h1>
        <DateRangeSelector range={dateRange} onChange={setDateRange} />
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        <MetricCards />
        <InsightsChart />
        <CampaignSection />
      </div>
    </div>
  );
};