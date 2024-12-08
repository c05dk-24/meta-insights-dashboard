import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';
import { IndustrySelect } from './PreferencesForm/IndustrySelect';
import { ToneSelector } from './PreferencesForm/ToneSelector';
import { AgeRangeSelect } from './PreferencesForm/AgeRangeSelect';
import { LocationInput } from './PreferencesForm/LocationInput';
import { toast } from 'react-hot-toast';

export const PreferencesForm = () => {
  const [formData, setFormData] = useState({
    industry: '',
    tone: 'professional',
    ageRange: '',
    location: '',
  });

  const setPreferences = useAIStore((state) => state.setPreferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreferences({
      id: crypto.randomUUID(),
      userId: 'current-user',
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    toast.success('Preferences saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        <h2 className="text-lg sm:text-xl font-semibold">Content Preferences</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <IndustrySelect
          value={formData.industry}
          onChange={(value) => setFormData({ ...formData, industry: value })}
        />

        <ToneSelector
          value={formData.tone}
          onChange={(value) => setFormData({ ...formData, tone: value as any })}
        />

        <AgeRangeSelect
          value={formData.ageRange}
          onChange={(value) => setFormData({ ...formData, ageRange: value })}
        />

        <LocationInput
          value={formData.location}
          onChange={(value) => setFormData({ ...formData, location: value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};