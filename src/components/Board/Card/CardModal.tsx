import React from 'react';
import { X, Calendar, Tag, MessageSquare, CheckSquare } from 'lucide-react';
import { BoardCard } from '../../../types/meta';
import { CardDescription } from './CardDescription';
import { CardChecklist } from './CardChecklist';
import { CardComments } from './CardComments';
import { CardDueDate } from './CardDueDate';
import { CardLabels } from './CardLabels';
import { useBoardStore } from '../../../store/boardStore';
import { toast } from 'react-hot-toast';

interface Props {
  card: BoardCard;
  listId: string;
  onClose: () => void;
  onUpdate: (updates: Partial<BoardCard>) => void;
}

export const CardModal: React.FC<Props> = ({ card, listId, onClose, onUpdate }) => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const moveCardToList = useBoardStore((state) => state.moveCardToList);
  const lists = activeBoard?.Lists || [];

  console.log('CardModal - Lists:', lists);

  const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetListId = e.target.value;
    if (targetListId !== listId) {
      try {
        moveCardToList(listId, targetListId, card.id);
        toast.success('Card moved successfully');
      } catch (error) {
        toast.error('Failed to move card');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* List Selection Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              List
            </label>
            <select
              value={listId}
              onChange={handleListChange}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
            >
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>

          {/* Rest of the modal content */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
};