import React from 'react';
import { useBoardStore } from '../../store/boardStore';
import { X } from 'lucide-react';

interface Props {
  currentListId: string;
  onSelect: (listId: string) => void;
  onClose: () => void;
}

export const ListSelector: React.FC<Props> = ({ currentListId, onSelect, onClose }) => {
  const lists = useBoardStore((state) => state.activeBoard?.lists || []);

  return (
    <div className="p-2 min-w-[200px]" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-2 pb-2 border-b dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Move to list</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X size={16} />
        </button>
      </div>
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
    </div>
  );
};