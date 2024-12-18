import { useEffect, useCallback } from 'react';
import { useBoardStore } from '../../../store/boardStore';
import { Board } from '../../../types/meta';

export const useBoardInitialization = (board: Board | undefined) => {
  const { setActiveBoard } = useBoardStore();

  const initializeBoard = useCallback(async () => {
    if (!board?.id) {
      console.warn('No board available for initialization');
      return;
    }

    try {
      console.log('Initializing board:', board.id);
      await setActiveBoard(board);
    } catch (error) {
      console.error('Failed to initialize board:', error);
      throw error;
    }
  }, [board, setActiveBoard]);

  useEffect(() => {
    initializeBoard().catch(error => {
      console.error('Board initialization failed:', error);
    });
  }, [initializeBoard]);

  return { initializeBoard };
};