import React, { useState } from 'react';
import { MetricCards } from '../components/Dashboard/MetricCards';
import { InsightsChart } from '../components/Dashboard/InsightsChart';
import { DateRangeSelector } from '../components/Dashboard/DateRangeSelector';
import { CampaignSection } from '../components/Dashboard/CampaignSection';
import { MetaConnect } from '../components/MetaConnect';
import { useMeta } from '../hooks/useMeta';
import { useMetaAuth } from '../hooks/useMetaAuth';
import { useAuth } from '../hooks/useAuth';
import { Building2 } from 'lucide-react';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState('thisWeek');
  const { useInsights } = useMeta();
  const { data: insights, isLoading } = useInsights(dateRange);
  const { isConnected } = useMetaAuth();
  const { user } = useAuth();

  console.log('Current user and company:', {
    userId: user?.id,
    companyId: user?.company_id,
    companyName: user?.companyName
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Meta Insights Dashboard</h1>
          {user?.companyName && (
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <Building2 className="w-4 h-4" />
              <span>{user.companyName}</span>
            </div>
          )}
        </div>
        <DateRangeSelector range={dateRange} onChange={setDateRange} />
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        {!isConnected && (
          <div className="mb-6">
            <MetaConnect />
          </div>
        )}
        
        <MetricCards insights={insights} isLoading={isLoading} />
        <InsightsChart />
        <CampaignSection />
      </div>
    </div>
  );
};