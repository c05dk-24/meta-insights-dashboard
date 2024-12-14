import React from 'react';
import { WelcomeSection } from './components/WelcomeSection';
import { MetaStatsSection } from './components/MetaStatsSection';
import { QuickActionsSection } from './components/QuickActionsSection';
import { RecentActivitySection } from './components/RecentActivitySection';
import { useAuth } from '../../hooks/useAuth';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <WelcomeSection userName={user?.name || 'Guest'} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MetaStatsSection />
          <RecentActivitySection />
        </div>
        <div className="space-y-6">
          <QuickActionsSection />
        </div>
      </div>
    </div>
  );
};