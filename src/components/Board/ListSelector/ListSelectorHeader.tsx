import React from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const ListSelectorHeader: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between mb-2 pb-2 border-b dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Move to list
      </h3>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X size={16} />
      </button>
    </div>
  );
};