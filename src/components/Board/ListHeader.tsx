import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface Props {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onDelete: () => void;
}

export const ListHeader: React.FC<Props> = ({ title, onTitleChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [showMenu, setShowMenu] = useState(false);

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onTitleChange(editTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 relative">
      {isEditing ? (
        <form onSubmit={handleTitleSubmit} className="flex-1">
          <input
            autoFocus
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-1 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            onBlur={handleTitleSubmit}
          />
        </form>
      ) : (
        <h3
          className="font-semibold cursor-pointer text-gray-900 dark:text-white"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h3>
      )}
      
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
      >
        <MoreHorizontal size={16} />
      </button>
      
      {showMenu && (
        <div className="absolute right-0 top-8 bg-white dark:bg-gray-700 rounded shadow-lg py-2 z-10 min-w-[120px]">
          <button
            onClick={() => {
              setIsEditing(true);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
          >
            Edit Title
          </button>
          <button
            onClick={() => {
              onDelete();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 dark:text-red-400"
          >
            Delete List
          </button>
        </div>
      )}
    </div>
  );
};