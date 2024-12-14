import React from 'react';
import { ContentRemixer } from './components/ContentRemixer';
import { BrandVoice } from './components/BrandVoice';
import { CaseStudyGenerator } from './components/CaseStudyGenerator';
import { ContentAgent } from './components/ContentAgent';

export const ContentTools = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 dark:text-white">
        Content Tools
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentRemixer />
        <BrandVoice />
        <CaseStudyGenerator />
        <ContentAgent />
      </div>
    </div>
  );
};