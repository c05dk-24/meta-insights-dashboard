import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useListSelector } from './useListSelector';
import { ListSelectorProps } from './types';

export const ListSelector: React.FC<ListSelectorProps> = ({ 
  currentListId, 
  lists, 
  onSelect,
  disabled = false 
}) => {
  const { sortedLists, handleListChange } = useListSelector(lists, onSelect);

  if (!lists || lists.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-sm">
        No lists available
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      <label 
        htmlFor="list-selector" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Move to List:
      </label>
      <div className="relative">
        <select
          id="list-selector"
          value={currentListId}
          onChange={handleListChange}
          disabled={disabled}
          className={`
            w-full pl-3 pr-10 py-2 text-base border dark:border-gray-600 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            appearance-none cursor-pointer
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {sortedLists.map((list) => (
            <option 
              key={list.id} 
              value={list.id}
              disabled={list.id === currentListId}
            >
              {list.title} {list.id === currentListId ? '(Current)' : ''}
            </option>
          ))}
        </select>
        <ChevronDown 
          className={`
            absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 
            text-gray-400 pointer-events-none
            ${disabled ? 'opacity-50' : ''}
          `} 
        />
      </div>
    </div>
  );
};