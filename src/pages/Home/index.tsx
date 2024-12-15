import React from 'react';
import { ProgressCircles } from './components/ProgressCircles';
import { NotesSection } from './components/NotesSection';
import { RequestSection } from './components/RequestSection';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Meta Insights Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Your AI-powered command center for Meta marketing excellence
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          <ProgressCircles />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <NotesSection />
            <RequestSection />
          </div>
        </div>
      </div>
    </div>
  );
};