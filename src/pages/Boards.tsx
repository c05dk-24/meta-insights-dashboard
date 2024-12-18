import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardList } from '../components/Board/BoardList';
import { AddList } from '../components/Board/AddList';
import { useBoards } from '../hooks/useBoards';
import { Plus } from 'lucide-react';
import { useBoard } from '../components/Board/hooks/useBoard';
import { useBoardDragDrop } from '../components/Board/hooks/useBoardDragDrop';
import { useAuth } from '../hooks/useAuth';

export const Boards = () => {
  const { user } = useAuth();
  const { useBoards: useBoardsQuery, useCreateBoard } = useBoards();
  const { data: boards = [], isLoading, error } = useBoardsQuery();
  const createBoard = useCreateBoard();
  const { moveCard } = useBoard();
  const { handleDragEnd } = useBoardDragDrop(moveCard);

  const handleCreateBoard = () => {
    if (!user) {
      return;
    }
    createBoard.mutate('New Board');
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full sm:w-80 h-96 bg-gray-100 rounded-lg flex-shrink-0"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          Failed to load boards. Please try again.
        </div>
      </div>
    );
  }

  const activeBoard = boards[0];

  if (!activeBoard) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Welcome to your boards</h1>
          <p className="text-gray-600 mb-8">Create your first board to get started</p>
          <button 
            onClick={handleCreateBoard}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={createBoard.isPending}
          >
            <Plus className="w-5 h-5 mr-2" />
            {createBoard.isPending ? 'Creating...' : 'Create Board'}
          </button>
        </div>
      </div>
    );
  }

  const listsForDropdown = activeBoard.Lists?.map(list => ({
    id: list.id,
    title: list.title
  })) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8">{activeBoard.title}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {activeBoard.Lists?.map((list, index) => (
            <BoardList 
              key={list.id} 
              list={list} 
              index={index}
              lists={listsForDropdown}
              onMoveCard={moveCard}
            />
          ))}
          <AddList boardId={activeBoard.id} />
        </div>
      </DragDropContext>
    </div>
  );
};