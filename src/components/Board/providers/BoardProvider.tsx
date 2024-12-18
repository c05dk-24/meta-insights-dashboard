```typescript
import React, { useEffect } from 'react';
import { Board } from '../../../types/meta';
import { BoardContext } from './BoardContext';
import { useBoardStore } from '../../../store/boardStore';
import { BoardLoadingState } from '../states';

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
      if (!board?.id) {
        console.warn('No board ID available for initialization');
        return;
      }

      try {
        console.log('Initializing board:', board.id);
        await setActiveBoard(board);
        setInitialized(true);
      } catch (err) {
        console.error('Board initialization failed:', err);
      }
    };

    initializeBoard();
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
```