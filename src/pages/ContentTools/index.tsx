import React from 'react';
import { ContentToolsGrid } from './components/ContentToolsGrid';

export const ContentTools = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 dark:text-white">
          Content Tools
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Powerful AI-powered tools to enhance your content creation workflow
        </p>
      </div>
      
      <ContentToolsGrid />
    </div>
  );
};