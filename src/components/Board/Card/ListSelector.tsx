import React from 'react';
import { ChevronDown } from 'lucide-react';
import { sortListsAlphabetically } from './utils/listUtils';

interface Props {
  currentListId: string;
  lists: { id: string; title: string }[];
  onSelect: (listId: string) => void;
  disabled?: boolean;
}

export const ListSelector: React.FC<Props> = ({ 
  currentListId, 
  lists, 
  onSelect,
  disabled = false 
}) => {
  const sortedLists = sortListsAlphabetically(lists);

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
          onChange={(e) => onSelect(e.target.value)}
          disabled={disabled}
          className={`
            w-full pl-3 pr-10 py-2 text-base border dark:border-gray-600 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            appearance-none cursor-pointer
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Select list to move card to"
        >
          {sortedLists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.title}
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