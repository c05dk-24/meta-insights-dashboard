import { useBoardStore } from '../../../../store/boardStore';

export const useListSelector = () => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const lists = activeBoard?.Lists || [];

  console.log('Active board:', activeBoard);
  console.log('Available lists:', lists);

  return {
    lists
  };
};