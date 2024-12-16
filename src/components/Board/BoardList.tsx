import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
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
    <Draggable draggableId={`list-${list.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4 w-full sm:w-80 flex-shrink-0 max-h-full flex flex-col"
        >
          <div {...provided.dragHandleProps}>
            <ListHeader
              title={list.title}
              onTitleChange={(newTitle) => updateListTitle(list.id, newTitle)}
              onDelete={() => deleteList(list.id)}
            />
          </div>

          <Droppable droppableId={list.id} type="CARD">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-1 overflow-y-auto space-y-2 min-h-[50px] py-2 ${
                  snapshot.isDraggingOver ? 'bg-gray-200/50 dark:bg-gray-700/50 rounded-lg' : ''
                }`}
              >
                {list.Cards?.map((card, cardIndex) => (
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

          <div className="mt-2 pt-2 border-t dark:border-gray-700">
            <AddCard listId={list.id} />
          </div>
        </div>
      )}
    </Draggable>
  );
};