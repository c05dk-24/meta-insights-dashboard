```tsx
import React from 'react';

interface Props {
  dueDate?: string;
  onUpdate: (dueDate: string) => void;
}

export const CardDueDate: React.FC<Props> = ({ dueDate, onUpdate }) => {
  return (
    <input
      type="date"
      value={dueDate || ''}
      onChange={(e) => onUpdate(e.target.value)}
      className="px-3 py-1.5 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
    />
  );
};
```