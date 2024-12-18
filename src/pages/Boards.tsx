import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardList } from '../components/Board/BoardList';
import { AddList } from '../components/Board/AddList';
import { useBoards } from '../hooks/useBoards';
import { BoardProvider } from '../components/Board/providers/BoardProvider';
import { BoardErrorBoundary } from '../components/Board/ErrorBoundary';
import { useBoardDragDrop } from '../components/Board/hooks/useBoardDragDrop';
import { useAuth } from '../hooks/useAuth';
import { 
  BoardLoadingState, 
  BoardErrorState, 
  EmptyBoardState 
} from '../components/Board/states';

export const Boards = () => {
  const { user } = useAuth();
  const { useBoards: useBoardsQuery, useCreateBoard } = useBoards();
  const { data: boards = [], isLoading, error } = useBoardsQuery();
  const createBoard = useCreateBoard();
  const { handleDragEnd } = useBoardDragDrop();

  // Get the current board
  const currentBoard = boards[0];

  const handleCreateBoard = () => {
    if (!user) return;
    createBoard.mutate('New Board');
  };

  if (isLoading) {
    return <BoardLoadingState />;
  }

  if (error) {
    return <BoardErrorState error={error} />;
  }

  if (!currentBoard) {
    return <EmptyBoardState onCreate={handleCreateBoard} isCreating={createBoard.isPending} />;
  }

  return (
    <BoardErrorBoundary>
      <BoardProvider
        board={currentBoard}
        isLoading={isLoading}
        error={error}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8">
            {currentBoard.title}
          </h1>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {currentBoard.Lists?.map((list, index) => (
                <BoardList
                  key={list.id}
                  list={list}
                  index={index}
                  lists={currentBoard.Lists || []}
                />
              ))}
              <AddList boardId={currentBoard.id} />
            </div>
          </DragDropContext>
        </div>
      </BoardProvider>
    </BoardErrorBoundary>
  );
};