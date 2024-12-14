import React from 'react';
import { Repeat } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { toast } from 'react-hot-toast';

export const ContentRemixer = () => {
  const handleClick = () => {
    toast.error('Content Remix feature is coming soon!');
  };

  return (
    <FeatureCard
      icon={Repeat}
      title="Content Remix"
      description="Transform your blog posts into multiple content formats automatically. Create social posts, email newsletters, and more from existing content."
      comingSoon={true}
      onClick={handleClick}
    />
  );
};