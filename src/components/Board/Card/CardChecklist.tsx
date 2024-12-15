```tsx
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useCardChecklist } from '../../../hooks/useCardChecklist';

interface Props {
  cardId: string;
}

export const CardChecklist: React.FC<Props> = ({ cardId }) => {
  const [newItem, setNewItem] = useState('');
  const { checklist, addItem, toggleItem, removeItem } = useCardChecklist(cardId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      addItem(newItem.trim());
      setNewItem('');
    }
  };

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
          disabled={!newItem.trim()}
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
              onChange={() => toggleItem(item.id)}
              className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : ''}`}>
              {item.text}
            </span>
            <button
              onClick={() => removeItem(item.id)}
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
```