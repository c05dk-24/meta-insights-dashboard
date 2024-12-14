import React from 'react';
import { MessageSquare } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const BrandVoice = () => {
  return (
    <FeatureCard
      icon={MessageSquare}
      title="Brand Voice"
      description="Maintain consistent brand messaging by analyzing and replicating your unique tone of voice across all content."
      comingSoon={true}
      onClick={() => {
        // Implementation coming soon
        console.log('Brand Voice clicked');
      }}
    />
  );
};