import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Label } from '../../../../types/meta';
import { LabelItem } from './LabelItem';
import { LabelSelector } from './LabelSelector';

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
          <LabelItem
            key={label.id}
            label={label}
            onRemove={onRemoveLabel}
          />
        ))}
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="inline-flex items-center border dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showSelector && (
        <LabelSelector
          availableLabels={availableLabels}
          onSelect={onAddLabel}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
};