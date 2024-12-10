import React from 'react';
import { AGE_RANGES } from '../../../constants/ai';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const AgeRangeSelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Target Age Range
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
  );
};