import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  isGenerating: boolean;
}

export const PromptInput: React.FC<Props> = ({ value, onChange, isGenerating }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Describe your content
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Write a post announcing our new summer collection with a focus on sustainable materials..."
        className="w-full p-2 sm:p-3 border rounded-lg h-24 sm:h-32 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={isGenerating}
      />
    </div>
  );
};