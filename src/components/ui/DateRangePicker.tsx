import React from 'react';
import { Calendar } from 'lucide-react';

interface Props {
  from: Date;
  to: Date;
  onChange: (range: { from: Date; to: Date }) => void;
}

export const DateRangePicker: React.FC<Props> = ({ from, to, onChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white border rounded-lg p-2">
      <Calendar className="text-gray-500 w-4 h-4" />
      <input
        type="date"
        value={from.toISOString().split('T')[0]}
        onChange={(e) => onChange({ from: new Date(e.target.value), to })}
        className="border-0 p-1 focus:ring-0"
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        value={to.toISOString().split('T')[0]}
        onChange={(e) => onChange({ from, to: new Date(e.target.value) })}
        className="border-0 p-1 focus:ring-0"
      />
    </div>
  );
};