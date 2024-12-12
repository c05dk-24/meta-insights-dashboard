import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Log user and company information
    console.log('Dashboard - User Info:', {
      userId: user?.id,
      userName: user?.name,
      companyId: user?.company_id,
      companyName: user?.companyName
    });
  }, [user]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Company Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Meta Insights Dashboard
            </h1>
            {user?.companyName && (
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <Building2 className="w-5 h-5" />
                <span className="text-lg font-medium">{user.companyName}</span>
              </div>
            )}
          </div>
          <DateRangeSelector range={dateRange} onChange={setDateRange} />
        </div>
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