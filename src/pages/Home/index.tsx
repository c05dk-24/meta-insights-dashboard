import React from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { StatsSection } from './components/StatsSection';
import { CTASection } from './components/CTASection';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <HeroSection />
        <FeaturesGrid />
        <StatsSection />
        <CTASection />
      </div>
    </div>
  );
};