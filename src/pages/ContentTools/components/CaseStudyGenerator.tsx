import React from 'react';
import { FileText } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { toast } from 'react-hot-toast';

export const CaseStudyGenerator = () => {
  const handleClick = () => {
    toast.error('Case Study Generator feature is coming soon!');
  };

  return (
    <FeatureCard
      icon={FileText}
      title="Case Study Generator"
      description="Turn customer success stories into compelling case studies. Upload transcripts or notes and let AI structure your case study."
      comingSoon={true}
      onClick={handleClick}
    />
  );
};