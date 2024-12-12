import React from 'react';
import { Calendar } from 'lucide-react';
import { DATE_RANGES } from '../../utils/dateRanges';

interface Props {
  range: string;
  onChange: (range: string) => void;
}

export const DateRangeSelector: React.FC<Props> = ({ range, onChange }) => {
  const ranges = [
    { value: DATE_RANGES.TODAY, label: 'Today' },
    { value: DATE_RANGES.THIS_WEEK, label: 'This Week' },
    { value: DATE_RANGES.LAST_WEEK, label: 'Last Week' },
    { value: DATE_RANGES.THIS_MONTH, label: 'This Month' },
    { value: DATE_RANGES.LAST_30_DAYS, label: 'Last 30 Days' },
  ];

  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow w-full sm:w-auto">
      <Calendar className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
      <select
        value={range}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 bg-transparent focus:ring-0 text-sm w-full sm:w-auto"
      >
        {ranges.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};