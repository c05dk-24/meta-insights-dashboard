import React from 'react';
import { Bot } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { toast } from 'react-hot-toast';

export const ContentAgent = () => {
  const handleClick = () => {
    toast.error('Content Agent feature is coming soon!');
  };

  return (
    <FeatureCard
      icon={Bot}
      title="Breeze Content Agent"
      description="Scale your content creation with an AI-powered expert that understands your brand and amplifies your marketing efforts."
      comingSoon={true}
      onClick={handleClick}
    />
  );
};