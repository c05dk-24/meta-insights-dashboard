import React from 'react';
import { MetricsSection } from './sections/MetricsSection';
import { WorkspaceSection } from './sections/WorkspaceSection';

export const Home = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Welcome to Meta Insights Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your AI-powered command center for Meta marketing excellence
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <MetricsSection />
          <WorkspaceSection />
        </div>
      </div>
    </div>
  );
};