```tsx
import React, { useState } from 'react';
import { AlignLeft } from 'lucide-react';

interface Props {
  description: string;
  onUpdate: (description: string) => void;
}

export const CardDescription: React.FC<Props> = ({ description, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(description);

  const handleSubmit = () => {
    onUpdate(value.trim());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <AlignLeft className="w-5 h-5" />
          <h3 className="font-medium">Description</h3>
        </div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3 border dark:border-gray-600 rounded-lg resize-none h-32 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Add a more detailed description..."
        />
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => {
              setValue(description);
              setIsEditing(false);
            }}
            className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsEditing(true)}
      className="space-y-2 cursor-pointer"
    >
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <AlignLeft className="w-5 h-5" />
        <h3 className="font-medium">Description</h3>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[80px]">
        {description || 'Add a more detailed description...'}
      </div>
    </div>
  );
};
```