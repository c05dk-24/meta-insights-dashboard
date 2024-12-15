import React from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const SidebarHeader: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="p-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">Meta Insights</h1>
      <button 
        onClick={onClose}
        className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <X className="w-5 h-5 dark:text-gray-400" />
      </button>
    </div>
  );
};