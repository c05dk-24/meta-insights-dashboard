import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { BoardCard } from './BoardCard';
import { BoardCard as BoardCardType } from '../../types/meta';

interface Props {
  listId: string;
  droppableId: string;
  cards: BoardCardType[];
}

export const DroppableList: React.FC<Props> = ({ listId, droppableId, cards }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex-1 overflow-y-auto space-y-2 min-h-[50px]"
        >
          {cards.map((card, cardIndex) => (
            <BoardCard
              key={card.id}
              card={card}
              index={cardIndex}
              listId={listId}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};