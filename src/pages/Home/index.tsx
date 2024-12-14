import React from 'react';
import { WelcomeSection } from './components/WelcomeSection';
import { MetaStatsSection } from './components/MetaStatsSection';
import { NotesSection } from './components/NotesSection';
import { RemindersSection } from './components/RemindersSection';
import { useAuth } from '../../hooks/useAuth';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <WelcomeSection userName={user?.name || 'Guest'} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetaStatsSection />
        <div className="space-y-6">
          <NotesSection />
          <RemindersSection />
        </div>
      </div>
    </div>
  );
};