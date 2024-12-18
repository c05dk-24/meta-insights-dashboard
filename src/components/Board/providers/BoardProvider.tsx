import React, { createContext, useContext, useEffect } from 'react';
import { Board } from '../../../types/meta';
import { useBoardStore } from '../../../store/boardStore';

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
    const initializeBoard = async () => {
      try {
        if (board?.id) {
          console.log('Initializing board:', board.id);
          await setActiveBoard(board);
          setInitialized(true);
        }
      } catch (err) {
        console.error('Failed to initialize board:', err);
      }
    };

    initializeBoard();
  }, [board, setActiveBoard]);

  const value = {
    board: board || null,
    isLoading,
    error,
    initialized
  };

  // Don't render children until board is initialized
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

const BoardLoadingState = () => (
  <div className="p-4">
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-48"></div>
      <div className="h-32 bg-gray-100 rounded"></div>
    </div>
  </div>
);