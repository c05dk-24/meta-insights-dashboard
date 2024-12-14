```typescript
import React from 'react';
import { Calendar } from 'lucide-react';

interface Props {
  startDate: Date;
  endDate: Date;
  onChange: (range: { startDate: Date; endDate: Date }) => void;
}

export const DateRangePicker: React.FC<Props> = ({ startDate, endDate, onChange }) => {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
      <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => onChange({ startDate: new Date(e.target.value), endDate })}
          className="border-0 bg-transparent focus:ring-0 dark:text-white"
        />
        <span className="text-gray-500 dark:text-gray-400">to</span>
        <input
          type="date"
          value={endDate.toISOString().split('T')[0]}
          onChange={(e) => onChange({ startDate, endDate: new Date(e.target.value) })}
          className="border-0 bg-transparent focus:ring-0 dark:text-white"
        />
      </div>
    </div>
  );
};
```