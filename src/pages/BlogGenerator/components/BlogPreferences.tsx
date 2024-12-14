import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useBlogStore } from '../../../store/blogStore';
import { KeywordInput } from './BlogPreferences/KeywordInput';
import { ToneSelector } from './BlogPreferences/ToneSelector';
import { IndustrySelect } from './BlogPreferences/IndustrySelect';
import { AudienceInput } from './BlogPreferences/AudienceInput';
import { LocationInput } from './BlogPreferences/LocationInput';
import { toast } from 'react-hot-toast';

export const BlogPreferences = () => {
  const [formData, setFormData] = useState({
    keywords: [] as string[],
    industry: '',
    location: '',
    tone: 'professional' as const,
    targetAudience: '',
  });

  const setPreferences = useBlogStore((state) => state.setPreferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreferences({
      id: crypto.randomUUID(),
      userId: 'current-user',
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    toast.success('Blog preferences saved successfully!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        <h2 className="text-lg sm:text-xl font-semibold dark:text-white">Blog Preferences</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <KeywordInput
          value={formData.keywords}
          onChange={(keywords) => setFormData({ ...formData, keywords })}
        />

        <IndustrySelect
          value={formData.industry}
          onChange={(industry) => setFormData({ ...formData, industry })}
        />

        <ToneSelector
          value={formData.tone}
          onChange={(tone) => setFormData({ ...formData, tone: tone as any })}
        />

        <AudienceInput
          value={formData.targetAudience}
          onChange={(targetAudience) => setFormData({ ...formData, targetAudience })}
        />

        <LocationInput
          value={formData.location}
          onChange={(location) => setFormData({ ...formData, location })}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};