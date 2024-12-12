import React from 'react';
import { MetricCards } from '../components/Dashboard/MetricCards';
import { InsightsChart } from '../components/Dashboard/InsightsChart';
import { CampaignSection } from '../components/Dashboard/CampaignSection';

export const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Analytics Dashboard</h1>
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        <MetricCards />
        <InsightsChart />
        <CampaignSection />
      </div>
    </div>
  );
};