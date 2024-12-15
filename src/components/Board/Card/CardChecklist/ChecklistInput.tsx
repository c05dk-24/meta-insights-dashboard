import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onAdd: (text: string) => void;
  isDisabled?: boolean;
}

export const ChecklistInput: React.FC<Props> = ({ onAdd, isDisabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add an item..."
        className="flex-1 px-3 py-1.5 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        disabled={isDisabled}
      />
      <button
        type="submit"
        disabled={!text.trim() || isDisabled}
        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        <Plus className="w-4 h-4" />
      </button>
    </form>
  );
};