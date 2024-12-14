import React from 'react';

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'technical', label: 'Technical' },
] as const;

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ToneSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Content Tone
      </label>
      <div className="grid grid-cols-2 gap-2">
        {TONES.map((tone) => (
          <label
            key={tone.value}
            className={`
              flex items-center justify-center p-3 rounded-lg border cursor-pointer text-sm
              transition-colors duration-200
              ${value === tone.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }
            `}
          >
            <input
              type="radio"
              name="tone"
              value={tone.value}
              checked={value === tone.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            {tone.label}
          </label>
        ))}
      </div>
    </div>
  );
};