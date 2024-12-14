import React, { useState } from 'react';
import { Tag, X } from 'lucide-react';

interface Props {
  value: string[];
  onChange: (keywords: string[]) => void;
}

export const KeywordInput: React.FC<Props> = ({ value, onChange }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const keyword = input.trim();
      if (keyword && !value.includes(keyword)) {
        onChange([...value, keyword]);
        setInput('');
      }
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    onChange(value.filter(k => k !== keywordToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Target Keywords
      </label>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 min-h-[32px]">
          {value.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
            >
              <Tag className="w-3 h-3" />
              {keyword}
              <button
                onClick={() => removeKeyword(keyword)}
                className="hover:text-blue-600 dark:hover:text-blue-300"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type keyword and press Enter"
          className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Press Enter or comma to add keywords
      </p>
    </div>
  );
};