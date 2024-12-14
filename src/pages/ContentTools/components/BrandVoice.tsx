import React from 'react';
import { MessageSquare } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { toast } from 'react-hot-toast';

export const BrandVoice = () => {
  const handleClick = () => {
    toast.error('Brand Voice feature is coming soon!');
  };

  return (
    <FeatureCard
      icon={MessageSquare}
      title="Brand Voice"
      description="Maintain consistent brand messaging by analyzing and replicating your unique tone of voice across all content."
      comingSoon={true}
      onClick={handleClick}
    />
  );
};