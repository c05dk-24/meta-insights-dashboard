import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Label } from '../../../../types/meta';

interface Props {
  labels: Label[];
  availableLabels: Label[];
  onAddLabel: (labelId: string) => void;
  onRemoveLabel: (labelId: string) => void;
}

export const CardLabels: React.FC<Props> = ({
  labels,
  availableLabels,
  onAddLabel,
  onRemoveLabel
}) => {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <span
            key={label.id}
            onClick={() => onRemoveLabel(label.id)}
            className={"inline-flex items-center p-2 rounded text-white text-sm cursor-pointer " + label.color}
          >
            {label.name}
          </span>
        ))}
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="inline-flex items-center border dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showSelector && (
        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600">
          <div className="space-y-1">
            {availableLabels.map((label) => (
              <div
                key={label.id}
                onClick={() => {
                  onAddLabel(label.id);
                  setShowSelector(false);
                }}
                className={"block w-full p-2 rounded text-white text-sm cursor-pointer " + label.color}
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