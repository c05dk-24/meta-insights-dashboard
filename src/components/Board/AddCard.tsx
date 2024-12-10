import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';

interface Props {
  listId: string;
}

export const AddCard: React.FC<Props> = ({ listId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const addCard = useBoardStore(state => state.addCard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addCard(listId, {
        title: title.trim(),
        description: '',
        labels: [],
      });
      setTitle('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
      >
        <Plus size={16} className="inline mr-1" />
        Add Card
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <textarea
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter card title..."
        className="w-full p-2 border rounded mb-2 min-h-[60px]"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Card
        </button>
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
    </form>
  );
};