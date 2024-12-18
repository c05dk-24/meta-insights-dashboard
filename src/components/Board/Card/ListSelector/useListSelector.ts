import { useCallback, useMemo } from 'react';
import { List } from './types';

export const useListSelector = (
  lists: List[],
  onSelect: (listId: string) => void
) => {
  const sortedLists = useMemo(() => {
    return [...lists].sort((a, b) => a.title.localeCompare(b.title));
  }, [lists]);

  const handleListChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newListId = e.target.value;
    if (newListId && newListId !== '') {
      onSelect(newListId);
    }
  }, [onSelect]);

  return {
    sortedLists,
    handleListChange
  };
};