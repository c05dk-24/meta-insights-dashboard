import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Calendar, Tag, Pencil, Trash, MessageSquare } from 'lucide-react';
import { BoardCard as BoardCardType } from '../../types/meta';
import { useBoardStore } from '../../store/boardStore';
import { CardModal } from './CardModal';

interface Props {
  card: BoardCardType;
  index: number;
  listId: string;
}

export const BoardCard: React.FC<Props> = ({ card, index, listId }) => {
  const [showModal, setShowModal] = useState(false);
  const { updateCard, deleteCard } = useBoardStore();

  const handleCardUpdate = (updates: Partial<BoardCardType>) => {
    updateCard(listId, card.id, updates);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white dark:bg-gray-700 p-4 rounded shadow-sm group cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleCardClick}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCard(listId, card.id);
                  }}
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
            
            {card.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{card.description}</p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {card.labels?.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {card.comments?.length > 0 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-3 h-3 inline mr-1" />
                    {card.comments.length}
                  </div>
                )}
                {card.dueDate && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {card.dueDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <CardModal
        card={card}
        listId={listId}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpdate={handleCardUpdate}
      />
    </>
  );
};