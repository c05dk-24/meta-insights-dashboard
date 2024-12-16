import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BoardCard as BoardCardType } from '../../../types/meta';
import { CardActions } from './CardActions';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { ListSelector } from '../ListSelector';
import { CardModal } from '../Card';
import { useCardActions } from './hooks/useCardActions';
import { useBoardStore } from '../../../store/boardStore';

interface Props {
  card: BoardCardType;
  index: number;
  listId: string;
}

export const BoardCard: React.FC<Props> = ({ card, index, listId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showListSelector, setShowListSelector] = useState(false);
  const { handleUpdate, handleDelete, handleMove } = useCardActions(listId, card.id);
  const activeBoard = useBoardStore((state) => state.activeBoard);

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm group cursor-pointer hover:shadow-md transition-shadow relative"
            onClick={() => setShowModal(true)}
          >
            <CardActions
              onEdit={() => setShowModal(true)}
              onDelete={handleDelete}
              onMove={() => setShowListSelector(true)}
            />
            <CardContent title={card.title} description={card.description} />
            <CardFooter card={card} />

            {showListSelector && (
              <div className="absolute z-20 right-0 mt-2">
                <ListSelector
                  currentListId={listId}
                  onSelect={(targetListId) => {
                    handleMove(targetListId);
                    setShowListSelector(false);
                  }}
                  onClose={() => setShowListSelector(false)}
                />
              </div>
            )}
          </div>
        )}
      </Draggable>

      {showModal && (
        <CardModal
          card={card}
          listId={listId}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};