import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}

export const TabButton: React.FC<Props> = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
      active
        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);