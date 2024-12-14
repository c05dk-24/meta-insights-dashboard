import React from 'react';
import { Repeat } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const ContentRemixer = () => {
  return (
    <FeatureCard
      icon={Repeat}
      title="Content Remix"
      description="Transform your blog posts into multiple content formats automatically. Create social posts, email newsletters, and more from existing content."
      comingSoon={true}
      onClick={() => {
        // Implementation coming soon
        console.log('Content Remix clicked');
      }}
    />
  );
};