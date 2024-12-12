import React from 'react';
import { PreferencesForm } from '../../components/AI/PreferencesForm';
import { ContentGenerator } from '../../components/AI/ContentGenerator';
import { ContentHistory } from '../../components/AI/ContentHistory';
import { useAIStore } from '../../store/aiStore';

export const AI = () => {
  const preferences = useAIStore((state) => state.preferences);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8">AI Content Generator</h1>
      
      {!preferences ? (
        <PreferencesForm />
      ) : (
        <div className="space-y-6 lg:space-y-8">
          <ContentGenerator />
          <ContentHistory />
        </div>
      )}
    </div>
  );
};