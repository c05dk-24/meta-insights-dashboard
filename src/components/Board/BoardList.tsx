import React from 'react';
import { BoardList as BoardListType } from '../../types/meta';
import { useBoardStore } from '../../store/boardStore';
import { AddCard } from './AddCard';
import { ListHeader } from './ListHeader';
import { DroppableList } from './DroppableList';

interface Props {
  list: BoardListType;
  index: number;
}

export const BoardList: React.FC<Props> = ({ list, index }) => {
  const { updateListTitle, deleteList } = useBoardStore();

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0 max-h-full flex flex-col">
      <ListHeader
        title={list.title}
        onTitleChange={(newTitle) => updateListTitle(list.id, newTitle)}
        onDelete={() => deleteList(list.id)}
      />

      <DroppableList
        listId={list.id}
        droppableId={index.toString()}
        cards={list.cards}
      />

      <div className="mt-2 pt-2 border-t">
        <AddCard listId={list.id} />
      </div>
    </div>
  );
};