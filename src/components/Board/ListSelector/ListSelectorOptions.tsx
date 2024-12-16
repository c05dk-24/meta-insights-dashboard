import React from 'react';
import { BoardList } from '../../../types/meta';
import { Loader } from 'lucide-react';

interface Props {
  lists: BoardList[];
  currentListId: string;
  onSelect: (listId: string) => void;
  isLoading?: boolean;
}

export const ListSelectorOptions: React.FC<Props> = ({ 
  lists, 
  currentListId, 
  onSelect,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader className="w-5 h-5 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (lists.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 py-2 text-center">
        No lists available
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {lists.map((list) => (
        <button
          key={list.id}
          onClick={() => onSelect(list.id)}
          disabled={list.id === currentListId}
          className={`
            w-full text-left px-3 py-2 rounded text-sm
            ${list.id === currentListId
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300'
            }
          `}
        >
          {list.title}
        </button>
      ))}
    </div>
  );
};