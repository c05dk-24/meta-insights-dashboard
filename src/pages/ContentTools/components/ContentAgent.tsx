import React from 'react';
import { Bot } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const ContentAgent = () => {
  return (
    <FeatureCard
      icon={Bot}
      title="Breeze Content Agent"
      description="Scale your content creation with an AI-powered expert that understands your brand and amplifies your marketing efforts."
      comingSoon={true}
      onClick={() => {
        // Implementation coming soon
        console.log('Content Agent clicked');
      }}
    />
  );
};