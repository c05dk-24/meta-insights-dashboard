import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { INDUSTRIES, TONES, AGE_RANGES } from '../../types/ai';
import { useAIStore } from '../../store/aiStore';

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
      userId: 'current-user', // TODO: Replace with actual user ID
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Content Preferences</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select an industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content Tone
          </label>
          <div className="grid grid-cols-2 gap-3">
            {TONES.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center justify-center p-3 rounded-lg border cursor-pointer
                  ${formData.tone === value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="tone"
                  value={value}
                  checked={formData.tone === value}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Age Range
          </label>
          <select
            value={formData.ageRange}
            onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select age range</option>
            {AGE_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., Global, United States, Europe"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};