import React from 'react';
import { Pencil, Trash, MoveRight } from 'lucide-react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onMove: () => void;
}

export const CardActions: React.FC<Props> = ({ onEdit, onDelete, onMove }) => {
  return (
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMove();
        }}
        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        title="Move card"
      >
        <MoveRight size={16} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
      >
        <Trash size={16} />
      </button>
    </div>
  );
};