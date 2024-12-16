import { useBoardStore } from '../../../../store/boardStore';
import { BoardList } from '../../../../types/meta';

export const useListSelector = () => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  
  // Ensure we have a properly typed array of lists
  const lists: BoardList[] = activeBoard?.Lists || [];
  
  // Debug logging
  console.log('useListSelector - Active board:', activeBoard);
  console.log('useListSelector - Lists:', lists);

  return {
    lists,
    isLoading: false
  };
};