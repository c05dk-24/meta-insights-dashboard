import { useCallback, useMemo } from 'react';
import { List } from './types';

export const useListSelector = (
  lists: List[],
  onSelect: (listId: string) => void,
  currentListId: string
) => {
  const sortedLists = useMemo(() => {
    if (!lists) return [];
    return [...lists].sort((a, b) => a.title.localeCompare(b.title));
  }, [lists]);

  const handleListChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newListId = e.target.value;
    console.log('List selected:', { newListId, currentListId });
    
    if (newListId && newListId !== currentListId) {
      onSelect(newListId);
    }
  }, [onSelect, currentListId]);

  return {
    sortedLists,
    handleListChange
  };
};