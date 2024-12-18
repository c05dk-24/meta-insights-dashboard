import { useMemo } from 'react';

export const useListSelector = (lists: { id: string; title: string }[], currentListId: string) => {
  const sortedLists = useMemo(() => {
    return [...lists].sort((a, b) => a.title.localeCompare(b.title));
  }, [lists]);

  const currentList = useMemo(() => {
    return lists.find(list => list.id === currentListId);
  }, [lists, currentListId]);

  return {
    sortedLists,
    currentList
  };
};