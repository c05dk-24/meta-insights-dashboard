import { useBoardStore } from '../../../../store/boardStore';
import { BoardList } from '../../../../types/meta';

export const useListSelector = () => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  
  // Ensure we have a properly typed array of lists
  const lists: BoardList[] = activeBoard?.Lists || [];
  
  // Debug logging
  console.log('Active board:', activeBoard?.id);
  console.log('Available lists:', lists.map(l => ({ id: l.id, title: l.title })));

  return {
    lists,
    isLoading: false
  };
};