import React from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { StatsSection } from './components/StatsSection';
import { CTASection } from './components/CTASection';

export const Home = () => {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <HeroSection />
      <FeaturesGrid />
      <StatsSection />
      <CTASection />
    </div>
  );
};