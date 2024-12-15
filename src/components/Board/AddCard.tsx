import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useCards } from '../../hooks/useCards';
import { toast } from 'react-hot-toast';

interface Props {
  listId: string;
}

export const AddCard: React.FC<Props> = ({ listId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const { useAddCard } = useCards();
  const addCard = useAddCard();

  console.log('AddCard component rendered:', { listId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    console.log('Submitting new card:', { listId, title });

    try {
      await addCard.mutateAsync({
        listId,
        title: title.trim()
      });
      setTitle('');
      setIsAdding(false);
      console.log('Card added successfully');
    } catch (error) {
      console.error('Failed to add card:', error);
      toast.error('Failed to add card');
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-100 rounded flex items-center gap-1"
      >
        <Plus size={16} />
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
        className="w-full p-2 border rounded mb-2 min-h-[60px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={addCard.isPending}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={addCard.isPending || !title.trim()}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {addCard.isPending ? 'Adding...' : 'Add Card'}
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