import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
}

export const FeatureCard = ({ feature }: FeatureProps) => {
  const Icon = feature.icon;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {feature.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
    </div>
  );
};