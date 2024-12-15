import React from 'react';
import { Label } from '../../../../types/meta';

interface Props {
  availableLabels: Label[];
  onSelect: (labelId: string) => void;
  onClose: () => void;
}

export const LabelSelector: React.FC<Props> = ({ availableLabels, onSelect, onClose }) => {
  return (
    <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600">
      <div className="space-y-1">
        {availableLabels.map((label) => (
          <div
            key={label.id}
            onClick={() => {
              onSelect(label.id);
              onClose();
            }}
            className={`px-2 py-1 rounded text-white text-sm cursor-pointer ${label.color}`}
          >
            {label.name}
          </div>
        ))}
      </div>
    </div>
  );
};