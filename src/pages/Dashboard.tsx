import React, { useState } from 'react';
import { MetricCards } from '../components/Dashboard/MetricCards';
import { InsightsChart } from '../components/Dashboard/InsightsChart';
import { DateRangeSelector } from '../components/Dashboard/DateRangeSelector';
import { useMeta } from '../hooks/useMeta';
import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState('thisWeek');
  const { useInsights } = useMeta();
  const { data: insights, isLoading, error } = useInsights(dateRange);
  const { user } = useAuth();

  if (!user?.meta_page_id) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            Meta Account Not Connected
          </h2>
          <p className="text-yellow-700">
            Please connect your Meta ad account in settings to view insights.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-700">
            {error.message || 'Failed to load insights. Please try again.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Meta Insights Dashboard</h1>
        <DateRangeSelector range={dateRange} onChange={setDateRange} />
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        <MetricCards insights={insights} isLoading={isLoading} />
        <InsightsChart />
      </div>
    </div>
  );
};