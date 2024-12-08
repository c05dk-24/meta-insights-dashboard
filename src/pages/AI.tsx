import React from 'react';
import { PreferencesForm } from '../components/AI/PreferencesForm';
import { ContentGenerator } from '../components/AI/ContentGenerator';
import { ContentHistory } from '../components/AI/ContentHistory';
import { useAIStore } from '../store/aiStore';
import { Settings } from 'lucide-react';

export const AI = () => {
  const { preferences } = useAIStore();
  const [showPreferences, setShowPreferences] = React.useState(!preferences);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">AI Content Generator</h1>
        {preferences && (
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">
              {showPreferences ? 'Hide' : 'Edit'} Preferences
            </span>
          </button>
        )}
      </div>
      
      {showPreferences ? (
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