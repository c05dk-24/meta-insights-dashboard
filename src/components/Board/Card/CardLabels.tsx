import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCardLabels } from '../../../hooks/useCardLabels';

interface Props {
  cardId: string;
  listId: string;
  onUpdate: (updates: any) => void;
}

export const CardLabels: React.FC<Props> = ({ cardId, listId, onUpdate }) => {
  const [showAdd, setShowAdd] = useState(false);
  const { labels, availableLabels, addLabel, removeLabel } = useCardLabels(cardId);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <span
            key={label.id}
            onClick={() => removeLabel(label.id)}
            className={`inline-block px-2 py-1 rounded text-white text-sm cursor-pointer ${label.color}`}
          >
            {label.name}
          </span>
        ))}
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center px-2 py-1 border dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showAdd && (
        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600">
          <div className="space-y-1">
            {availableLabels.map((label) => (
              <div
                key={label.id}
                onClick={() => {
                  addLabel(label.id);
                  setShowAdd(false);
                }}
                className={`px-2 py-1 rounded text-white text-sm cursor-pointer ${label.color}`}
              >
                {label.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};