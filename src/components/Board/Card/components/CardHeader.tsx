import React from 'react';
import { X } from 'lucide-react';

interface Props {
  title: string;
  onClose: () => void;
}

export const CardHeader: React.FC<Props> = ({ title, onClose }) => {
  return (
    <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
      <button 
        onClick={onClose}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        aria-label="Close modal"
      >
        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
};