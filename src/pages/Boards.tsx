import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardList } from '../components/Board/BoardList';
import { AddList } from '../components/Board/AddList';
import { useBoards } from '../hooks/useBoards';
import { Plus } from 'lucide-react';

export const Boards = () => {
  const { useBoards: useBoardsQuery } = useBoards();
  const { data: boards, isLoading, error } = useBoardsQuery();

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

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          Failed to load boards. Please try again.
        </div>
      </div>
    );
  }

  const activeBoard = boards?.[0];

  if (!activeBoard) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to your boards</h1>
          <p className="text-gray-600 mb-8">Create your first board to get started</p>
          <button 
            onClick={() => {}} 
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">{activeBoard.title}</h1>
      <DragDropContext onDragEnd={() => {}}>
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