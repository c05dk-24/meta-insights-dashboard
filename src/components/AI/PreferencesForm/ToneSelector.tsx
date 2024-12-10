import React from 'react';
import { TONES } from '../../../constants/ai';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ToneSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Content Tone
      </label>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {TONES.map(({ value: toneValue, label }) => (
          <label
            key={toneValue}
            className={`
              flex items-center justify-center p-2 sm:p-3 rounded-lg border cursor-pointer text-sm sm:text-base
              transition-colors duration-200
              ${value === toneValue
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <input
              type="radio"
              name="tone"
              value={toneValue}
              checked={value === toneValue}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};