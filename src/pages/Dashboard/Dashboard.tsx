import React, { useState } from 'react';
import { MetricCards } from '../../components/Dashboard/MetricCards';
import { InsightsChart } from '../../components/Dashboard/InsightsChart';
import { DateRangeSelector } from '../../components/Dashboard/DateRangeSelector';
import { CampaignSection } from '../../components/Dashboard/CampaignSection';
import { BusinessInfo } from '../../components/Dashboard/BusinessInfo';
import { useMeta } from '../../hooks/useMeta';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState('thisWeek');
  const { useInsights, useAccountInfo } = useMeta();
  const { data: insights, isLoading: insightsLoading } = useInsights(dateRange);
  const { user } = useAuth();
  
  console.log('Dashboard - User Meta Page ID:', user?.meta_page_id);
  
  const { data: accountInfo, isLoading: accountLoading } = useAccountInfo(user?.meta_page_id);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Meta Insights Dashboard</h1>
          <BusinessInfo 
            companyName={user?.company_name}
            adAccountName={accountInfo?.name}
            isLoading={accountLoading}
          />
        </div>
        <DateRangeSelector range={dateRange} onChange={setDateRange} />
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        <MetricCards insights={insights} isLoading={insightsLoading} />
        <InsightsChart />
        <CampaignSection />
      </div>
    </div>
  );
};