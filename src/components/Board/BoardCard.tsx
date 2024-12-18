import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BoardCard as BoardCardType } from '../../types/meta';
import { CardModal } from './Card/CardModal';

interface Props {
  card: BoardCardType;
  index: number;
  listId: string;
  lists: { id: string; title: string }[];
  onMoveCard: (cardId: string, sourceListId: string, destinationListId: string) => Promise<void>;
}

export const BoardCard: React.FC<Props> = ({ card, index, listId, lists, onMoveCard }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleMoveCard = async (destinationListId: string) => {
    if (destinationListId === listId) return;
    await onMoveCard(card.id, listId, destinationListId);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`
              bg-white dark:bg-gray-700 p-3 rounded shadow-sm
              ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''}
              hover:shadow-md transition-shadow cursor-pointer
            `}
            onClick={() => setShowModal(true)}
          >
            <h4 className="font-medium dark:text-white">{card.title}</h4>
            {card.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                {card.description}
              </p>
            )}
          </div>
        )}
      </Draggable>

      {showModal && (
        <CardModal
          card={card}
          listId={listId}
          lists={lists}
          onClose={() => setShowModal(false)}
          onMoveCard={handleMoveCard}
        />
      )}
    </>
  );
};