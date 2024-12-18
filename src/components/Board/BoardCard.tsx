import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical, Calendar } from 'lucide-react';
import { BoardCard as BoardCardType } from '../../types/meta';
import { CardModal } from './Card/CardModal';
import { format } from 'date-fns';

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
    console.log('Moving card:', { cardId: card.id, from: listId, to: destinationListId });
    await onMoveCard(card.id, listId, destinationListId);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`
              group bg-white dark:bg-gray-700 p-3 rounded shadow-sm
              ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''}
              hover:shadow-md transition-shadow
            `}
          >
            <div className="flex items-start gap-2">
              {/* Grip Handle */}
              <div
                {...provided.dragHandleProps}
                className="mt-1 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>

              {/* Card Content */}
              <div 
                className="flex-1 cursor-pointer" 
                onClick={() => setShowModal(true)}
              >
                <h4 className="font-medium dark:text-white">{card.title}</h4>
                {card.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                    {card.description}
                  </p>
                )}
                
                {/* Card Footer */}
                {(card.due_date || card.Labels?.length > 0) && (
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    {card.due_date && (
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(card.due_date), 'MMM d')}
                      </div>
                    )}
                    {card.Labels?.map(label => (
                      <span
                        key={label.id}
                        className={`px-2 py-0.5 rounded-full ${label.color} text-white`}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
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