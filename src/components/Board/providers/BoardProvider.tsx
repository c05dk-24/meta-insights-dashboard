import React, { createContext, useContext } from 'react';
import { Board } from '../../../types/meta';
import { useBoardInitialization } from '../hooks/useBoardInitialization';

interface BoardContextValue {
  board: Board | undefined;
  isLoading: boolean;
  error: Error | null;
}

const BoardContext = createContext<BoardContextValue | undefined>(undefined);

interface Props {
  children: React.ReactNode;
  board: Board | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const BoardProvider: React.FC<Props> = ({
  children,
  board,
  isLoading,
  error
}) => {
  // Initialize board state
  useBoardInitialization(board);

  const value = {
    board,
    isLoading,
    error
  };

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