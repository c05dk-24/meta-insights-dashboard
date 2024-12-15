import React from 'react';
import { Trash2 } from 'lucide-react';

interface Props {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ChecklistItem: React.FC<Props> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
      />
      <span className={`flex-1 ${completed ? 'line-through text-gray-500' : ''}`}>
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="p-1 text-gray-400 hover:text-red-500"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};