import React from 'react';
import { INDUSTRIES } from '../../../constants/ai';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const IndustrySelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Industry
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
  );
};