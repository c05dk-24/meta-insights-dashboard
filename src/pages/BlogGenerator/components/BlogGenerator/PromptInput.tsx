import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  isGenerating: boolean;
}

export const PromptInput: React.FC<Props> = ({ value, onChange, isGenerating }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Blog Topic
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your blog topic and any specific points you want to cover..."
        className="w-full p-3 border dark:border-gray-600 rounded-lg h-32 text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        disabled={isGenerating}
      />
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Be specific about your topic, target audience, and desired outcome
      </p>
    </div>
  );
};