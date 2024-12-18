import React, { createContext, useContext, useEffect } from 'react';
import { Board } from '../../../types/meta';
import { useBoardStore } from '../../../store/boardStore';
import { BoardLoadingState } from '../states';

interface BoardContextValue {
  board: Board | null;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
}

const BoardContext = createContext<BoardContextValue | undefined>(undefined);

interface Props {
  children: React.ReactNode;
  board: Board;
  isLoading: boolean;
  error: Error | null;
}

export const BoardProvider: React.FC<Props> = ({
  children,
  board,
  isLoading,
  error
}) => {
  const { setActiveBoard } = useBoardStore();
  const [initialized, setInitialized] = React.useState(false);

  useEffect(() => {
    if (!board?.id) {
      console.warn('No board ID available for initialization');
      return;
    }

    console.log('Initializing board:', board.id);
    
    try {
      setActiveBoard(board);
      setInitialized(true);
    } catch (err) {
      console.error('Failed to initialize board:', err);
    }
  }, [board, setActiveBoard]);

  const value = React.useMemo(() => ({
    board: board || null,
    isLoading,
    error,
    initialized
  }), [board, isLoading, error, initialized]);

  if (!initialized && !error) {
    return <BoardLoadingState />;
  }

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};