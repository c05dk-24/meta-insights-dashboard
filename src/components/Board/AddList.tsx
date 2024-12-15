import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useBoards } from '../../hooks/useBoards';
import { toast } from 'react-hot-toast';

interface Props {
  boardId: string;
}

export const AddList: React.FC<Props> = ({ boardId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const { useCreateList } = useBoards();
  const createList = useCreateList();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createList.mutateAsync({
        boardId,
        title: title.trim()
      });
      setTitle('');
      setIsAdding(false);
    } catch (error) {
      toast.error('Failed to create list');
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="bg-white/80 hover:bg-white w-80 h-12 rounded-lg flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Plus size={20} />
        Add List
      </button>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg w-80">
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title..."
          className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={createList.isPending}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={createList.isPending || !title.trim()}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {createList.isPending ? 'Adding...' : 'Add List'}
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
    </div>
  );
};