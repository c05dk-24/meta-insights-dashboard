import React from 'react';
import { ProgressCircles } from './components/ProgressCircles';
import { NotesSection } from './components/NotesSection';
import { RequestSection } from './components/RequestSection';

export const Home = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Command Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your AI-powered marketing intelligence hub
          </p>
        </div>

        {/* Progress Circles */}
        <ProgressCircles />

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NotesSection />
          <RequestSection />
        </div>
      </div>
    </div>
  );
};