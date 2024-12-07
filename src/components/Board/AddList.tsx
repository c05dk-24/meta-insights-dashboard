import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';

export const AddList = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const addList = useBoardStore(state => state.addList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addList(title.trim());
      setTitle('');
      setIsAdding(false);
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
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add List
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