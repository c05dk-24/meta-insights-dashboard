import React from 'react';
import { ListMinus } from 'lucide-react';
import { BoardList } from '../../../types/meta';

interface Props {
  currentListId: string;
  lists: BoardList[];
  onListChange: (listId: string) => void;
}

export const ListSelector: React.FC<Props> = ({ currentListId, lists, onListChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <ListMinus className="w-5 h-5" />
        <h3 className="font-medium">Current List</h3>
      </div>
      <div className="relative">
        <select
          value={currentListId}
          onChange={(e) => onListChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white appearance-none cursor-pointer"
        >
          {lists.map((list) => (
            <option 
              key={list.id} 
              value={list.id}
              className="py-2"
            >
              {list.title}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};