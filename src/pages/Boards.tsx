import React, { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { BoardList } from '../components/Board/BoardList';
import { AddList } from '../components/Board/AddList';
import { useBoards } from '../hooks/useBoards';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useBoardStore } from '../store/boardStore';

export const Boards = () => {
  const { user } = useAuth();
  const { useBoards: useBoardsQuery, useCreateBoard } = useBoards();
  const { data: boards = [], isLoading, error } = useBoardsQuery();
  const createBoard = useCreateBoard();
  const { moveCard, activeBoard, setActiveBoard } = useBoardStore();

  // Set active board when boards are loaded
  useEffect(() => {
    if (boards.length > 0 && !activeBoard) {
      setActiveBoard(boards[0]);
    }
  }, [boards, activeBoard, setActiveBoard]);

  const handleCreateBoard = () => {
    if (!user) {
      toast.error('You must be logged in to create a board');
      return;
    }
    createBoard.mutate('New Board');
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'CARD') {
      moveCard(
        draggableId,
        source.droppableId,
        destination.droppableId,
        destination.index
      );
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8"></div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full sm:w-80 h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 rounded-lg">
          Failed to load boards. Please try again.
        </div>
      </div>
    );
  }

  if (!activeBoard) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">Welcome to your boards</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Create your first board to get started</p>
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 dark:text-white">
        {activeBoard.title}
      </h1>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="LIST" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 overflow-x-auto pb-4"
            >
              {activeBoard.lists?.map((list, index) => (
                <BoardList key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
              <AddList boardId={activeBoard.id} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};