import React from 'react';
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
  const moveCard = useBoardStore((state) => state.moveCard);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    // Dropped outside the list
    if (!destination) return;

    // No movement
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

  // ... rest of the component remains the same

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 dark:text-white">
        {activeBoard?.title}
      </h1>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="LIST" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 overflow-x-auto pb-4"
            >
              {activeBoard?.lists?.map((list, index) => (
                <BoardList key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
              <AddList boardId={activeBoard?.id || ''} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};