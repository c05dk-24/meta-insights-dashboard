import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardList } from '../components/Board/BoardList';
import { AddList } from '../components/Board/AddList';
import { useBoardStore } from '../store/boardStore';

export const Boards = () => {
  const { activeBoard, moveCard } = useBoardStore();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    moveCard(result.source, result.destination);
  };

  if (!activeBoard) {
    return <div>No board selected</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">{activeBoard.title}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {activeBoard.lists.map((list, index) => (
            <BoardList key={list.id} list={list} index={index} />
          ))}
          <AddList />
        </div>
      </DragDropContext>
    </div>
  );
};