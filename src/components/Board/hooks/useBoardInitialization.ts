import { useEffect } from 'react';
import { useBoardStore } from '../../../store/boardStore';
import { Board } from '../../../types/meta';

export const useBoardInitialization = (board: Board | undefined) => {
  const { setActiveBoard } = useBoardStore();

  useEffect(() => {
    if (!board) {
      console.log('No board available for initialization');
      return;
    }

    console.log('Initializing board:', board.id);
    setActiveBoard(board);
  }, [board, setActiveBoard]);
};