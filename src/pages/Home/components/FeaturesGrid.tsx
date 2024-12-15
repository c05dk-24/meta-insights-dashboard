import React from 'react';
import { FeatureCard } from './FeatureCard';
import { features } from '../data/features';

export const FeaturesGrid = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Everything You Need to Succeed
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  );
};