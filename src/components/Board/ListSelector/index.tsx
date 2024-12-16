import React from 'react';
import { ListSelectorHeader } from './ListSelectorHeader';
import { ListSelectorOptions } from './ListSelectorOptions';
import { useListSelector } from './hooks/useListSelector';

interface Props {
  currentListId: string;
  onSelect: (listId: string) => void;
  onClose: () => void;
}

export const ListSelector: React.FC<Props> = ({ currentListId, onSelect, onClose }) => {
  const { lists, isLoading } = useListSelector();

  return (
    <div 
      className="p-2 min-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700" 
      onClick={(e) => e.stopPropagation()}
    >
      <ListSelectorHeader onClose={onClose} />
      <ListSelectorOptions 
        lists={lists}
        currentListId={currentListId}
        onSelect={onSelect}
        isLoading={isLoading}
      />
    </div>
  );
};