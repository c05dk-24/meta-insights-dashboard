import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardList } from '../components/Board/BoardList';
import { AddList } from '../components/Board/AddList';
import { useBoards } from '../hooks/useBoards';

export const Boards = () => {
  const { useBoards: useBoardsQuery, useMoveCard } = useBoards();
  const { data: boards, isLoading } = useBoardsQuery();
  const moveCardMutation = useMoveCard();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceListId = boards[0].lists[parseInt(result.source.droppableId)].id;
    const destinationListId = boards[0].lists[parseInt(result.destination.droppableId)].id;
    const cardId = result.draggableId;

    moveCardMutation.mutate({
      boardId: boards[0].id,
      cardId,
      sourceListId,
      destinationListId,
      newPosition: result.destination.index
    });
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-80 h-96 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const activeBoard = boards?.[0];

  if (!activeBoard) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8">No boards found</h1>
        <AddList />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">{activeBoard.title}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {activeBoard.lists.map((list, index) => (
            <BoardList key={list.id} list={list} index={index} />
          ))}
          <AddList boardId={activeBoard.id} />
        </div>
      </DragDropContext>
    </div>
  );
};