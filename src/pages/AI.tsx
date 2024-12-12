```typescript
import React from 'react';
import { PreferencesForm } from '../components/AI/PreferencesForm';
import { ContentGenerator } from '../components/AI/ContentGenerator';
import { ContentHistory } from '../components/AI/ContentHistory';
import { useAIStore } from '../store/aiStore';
import { Settings } from 'lucide-react';

export const AI = () => {
  const { preferences, setShowPreferences, showPreferences } = useAIStore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">AI Content Generator</h1>
        {preferences && !showPreferences && (
          <button
            onClick={() => setShowPreferences(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            Edit Preferences
          </button>
        )}
      </div>
      
      {(!preferences || showPreferences) ? (
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
```