import React from 'react';
import { FileText } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const CaseStudyGenerator = () => {
  return (
    <FeatureCard
      icon={FileText}
      title="Case Study Generator"
      description="Turn customer success stories into compelling case studies. Upload transcripts or notes and let AI structure your case study."
      comingSoon={true}
      onClick={() => {
        // Implementation coming soon
        console.log('Case Study Generator clicked');
      }}
    />
  );
};