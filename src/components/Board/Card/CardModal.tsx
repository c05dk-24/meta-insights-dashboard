import React from 'react';
import { X, Calendar, Tag, MessageSquare, CheckSquare } from 'lucide-react';
import { Card } from '../../../types/meta';
import { CardDescription } from './CardDescription';
import { CardChecklist } from './CardChecklist';
import { CardComments } from './CardComments';
import { CardDueDate } from './CardDueDate';
import { CardLabels } from './CardLabels';

interface Props {
  card: Card;
  listId: string;
  onClose: () => void;
  onUpdate: (updates: Partial<Card>) => void;
}

export const CardModal: React.FC<Props> = ({ card, listId, onClose, onUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-white">{card.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <CardDescription 
            description={card.description || ''} 
            onUpdate={(description) => onUpdate({ description })}
          />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Tag className="w-5 h-5" />
              <h3 className="font-medium">Labels</h3>
            </div>
            <CardLabels 
              labels={card.Labels || []}
              availableLabels={[]} // This should be populated from props or context
              onAddLabel={(labelId) => {
                // Handle adding label
              }}
              onRemoveLabel={(labelId) => {
                // Handle removing label
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="w-5 h-5" />
              <h3 className="font-medium">Due Date</h3>
            </div>
            <CardDueDate 
              dueDate={card.due_date} 
              onUpdate={(due_date) => onUpdate({ due_date })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <CheckSquare className="w-5 h-5" />
              <h3 className="font-medium">Checklist</h3>
            </div>
            <CardChecklist cardId={card.id} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-medium">Comments</h3>
            </div>
            <CardComments cardId={card.id} />
          </div>
        </div>
      </div>
    </div>
  );
};