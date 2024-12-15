import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Calendar, Tag, Pencil, Trash, MessageSquare } from 'lucide-react';
import { BoardCard as BoardCardType } from '../../types/meta';
import { useBoardStore } from '../../store/boardStore';
import { CardModal } from './Card/CardModal';
import { toast } from 'react-hot-toast';

interface Props {
  card: BoardCardType;
  index: number;
  listId: string;
}

export const BoardCard: React.FC<Props> = ({ card, index, listId }) => {
  const [showModal, setShowModal] = useState(false);
  const { updateCard, deleteCard } = useBoardStore();

  const handleCardUpdate = (updates: Partial<BoardCardType>) => {
    try {
      updateCard(listId, card.id, updates);
      toast.success('Card updated successfully');
    } catch (error) {
      toast.error('Failed to update card');
    }
  };

  const handleCardDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      deleteCard(listId, card.id);
      toast.success('Card deleted successfully');
    } catch (error) {
      toast.error('Failed to delete card');
    }
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm group cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowModal(true)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium dark:text-white">{card.title}</h4>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={handleCardDelete}
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
            
            {card.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {card.description}
              </p>
            )}
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-3">
                {card.Labels?.length > 0 && (
                  <span className="flex items-center text-gray-500 dark:text-gray-400">
                    <Tag className="w-3 h-3 mr-1" />
                    {card.Labels.length}
                  </span>
                )}
                {card.Comments?.length > 0 && (
                  <span className="flex items-center text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {card.Comments.length}
                  </span>
                )}
              </div>
              {card.due_date && (
                <span className="flex items-center text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(card.due_date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </Draggable>

      {showModal && (
        <CardModal
          card={card}
          listId={listId}
          onClose={() => setShowModal(false)}
          onUpdate={handleCardUpdate}
        />
      )}
    </>
  );
};