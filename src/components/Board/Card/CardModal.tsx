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
import { useCardMove } from './hooks/useCardMove';

interface Props {
  card: BoardCard;
  listId: string;
  lists: { id: string; title: string }[];
  onClose: () => void;
}

export const CardModal: React.FC<Props> = ({ 
  card, 
  listId, 
  lists = [], // Provide default empty array
  onClose
}) => {
  const { isMoving, handleMoveCard } = useCardMove();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader title={card.title} onClose={onClose} />

        <div className="p-4 space-y-6">
          {lists.length > 0 && (
            <CardSection icon={MoveRight} title="Move Card">
              <ListSelector
                currentListId={listId}
                lists={lists}
                onSelect={handleMoveCard}
                disabled={isMoving}
              />
            </CardSection>
          )}

          <CardSection icon={Tag} title="Description">
            <CardDescription 
              description={card.description || ''} 
              onUpdate={() => {}} // Add proper update handler
            />
          </CardSection>

          <CardSection icon={Calendar} title="Due Date">
            <CardDueDate 
              dueDate={card.due_date} 
              onUpdate={() => {}} // Add proper update handler
            />
          </CardSection>

          <CardSection icon={CheckSquare} title="Checklist">
            <CardChecklist cardId={card.id} />
          </CardSection>

          <CardSection icon={MessageSquare} title="Comments">
            <CardComments cardId={card.id} />
          </CardSection>
        </div>
      </div>
    </div>
  );
};