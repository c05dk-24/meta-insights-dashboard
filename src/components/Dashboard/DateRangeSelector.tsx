import React from 'react';
import { Calendar } from 'lucide-react';
import { DATE_RANGES } from '../../constants/dateRanges';

interface Props {
  range: string;
  onChange: (range: string) => void;
}

export const DateRangeSelector: React.FC<Props> = ({ range, onChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow w-full sm:w-auto">
      <Calendar className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
      <select
        value={range}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 bg-transparent focus:ring-0 text-sm w-full sm:w-auto"
      >
        {Object.entries(DATE_RANGES).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};