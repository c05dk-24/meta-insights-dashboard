import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { BoardList as BoardListType } from '../../types/meta';
import { useBoardStore } from '../../store/boardStore';
import { AddCard } from './AddCard';
import { ListHeader } from './ListHeader';
import { BoardCard } from './BoardCard';

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

      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 overflow-y-auto space-y-2 min-h-[50px] py-2"
          >
            {list.cards?.map((card, cardIndex) => (
              <BoardCard
                key={card.id}
                card={card}
                index={cardIndex}
                listId={list.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-2 pt-2 border-t">
        <AddCard listId={list.id} />
      </div>
    </div>
  );
};