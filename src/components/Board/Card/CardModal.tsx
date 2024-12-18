import React from 'react';
import { Calendar, Tag, MessageSquare, CheckSquare, MoveRight } from 'lucide-react';
import { BoardCard } from '../../../types/meta';
import { CardHeader } from './components/CardHeader';
import { CardSection } from './components/CardSection';
import { CardDescription } from './CardDescription';
import { CardChecklist } from './CardChecklist';
import { CardComments } from './CardComments';
import { CardDueDate } from './CardDueDate';
import { CardLabels } from './CardLabels';
import { ListSelector } from './ListSelector';
import { useCardMove } from '../../../hooks/useCardMove';

interface Props {
  card: BoardCard;
  listId: string;
  lists: { id: string; title: string }[];
  onClose: () => void;
}

export const CardModal: React.FC<Props> = ({ 
  card, 
  listId, 
  lists, 
  onClose
}) => {
  const { isMoving, moveCard } = useCardMove();

  const handleMoveCard = async (destinationListId: string) => {
    if (destinationListId === listId) return;
    await moveCard(card.id, listId, destinationListId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader title={card.title} onClose={onClose} />

        <div className="p-4 space-y-6">
          <CardSection icon={MoveRight} title="Move Card">
            <ListSelector
              currentListId={listId}
              lists={lists}
              onSelect={handleMoveCard}
              disabled={isMoving}
            />
          </CardSection>

          {/* Other card sections remain the same */}
        </div>
      </div>
    </div>
  );
};