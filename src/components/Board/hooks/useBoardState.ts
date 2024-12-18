import { useEffect } from 'react';
import { useBoardStore } from '../../../store/boardStore';
import { Board } from '../../../types/meta';

export const useBoardState = (board: Board | undefined) => {
  const { setActiveBoard, activeBoard } = useBoardStore();

  useEffect(() => {
    if (board && (!activeBoard || activeBoard.id !== board.id)) {
      console.log('Initializing active board:', board.id);
      setActiveBoard(board);
    }
  }, [board, activeBoard, setActiveBoard]);

  return { activeBoard };
};