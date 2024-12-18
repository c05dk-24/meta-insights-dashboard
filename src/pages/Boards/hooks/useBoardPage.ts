```typescript
import { useBoards } from '../../../hooks/useBoards';
import { useAuth } from '../../../hooks/useAuth';
import { useBoardDragDrop } from '../../../components/Board/hooks/useBoardDragDrop';

export const useBoardPage = () => {
  const { user } = useAuth();
  const { useBoards: useBoardsQuery, useCreateBoard } = useBoards();
  const { data: boards = [], isLoading, error } = useBoardsQuery();
  const createBoard = useCreateBoard();
  const { handleDragEnd } = useBoardDragDrop();

  const currentBoard = boards[0];

  const handleCreateBoard = () => {
    if (!user) return;
    createBoard.mutate('New Board');
  };

  return {
    user,
    boards,
    currentBoard,
    isLoading,
    error,
    createBoard,
    handleDragEnd,
    handleCreateBoard
  };
};
```