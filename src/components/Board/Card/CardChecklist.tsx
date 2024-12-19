import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useCardChecklist } from '../../../hooks/useCardChecklist';

interface Props {
  cardId: string;
}

export const CardChecklist: React.FC<Props> = ({ cardId }) => {
  const [newItem, setNewItem] = useState('');
  const { checklist, addItem, toggleItem, removeItem, isLoading } = useCardChecklist(cardId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      await addItem.mutateAsync(newItem.trim());
      setNewItem('');
    }
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading checklist...</div>;
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add an item..."
          className="flex-1 px-3 py-1.5 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={!newItem.trim() || addItem.isPending}
          className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-2">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem.mutate(item.id)}
              className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className={item.completed ? 'flex-1 line-through text-gray-500' : 'flex-1'}>
              {item.text}
            </span>
            <button
              onClick={() => removeItem.mutate(item.id)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};