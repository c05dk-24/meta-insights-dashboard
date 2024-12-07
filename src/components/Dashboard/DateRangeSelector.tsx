import React from 'react';
import { Calendar } from 'lucide-react';

interface Props {
  range: string;
  onChange: (range: string) => void;
}

export const DateRangeSelector: React.FC<Props> = ({ range, onChange }) => {
  const ranges = [
    { value: 'today', label: 'Today' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'lastWeek', label: 'Last Week' },
    { value: 'thisMonth', label: 'This Month' },
  ];

  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
      <Calendar className="text-gray-500 w-5 h-5" />
      <select
        value={range}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 bg-transparent focus:ring-0 text-sm"
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