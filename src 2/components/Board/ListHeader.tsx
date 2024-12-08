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
            className="w-full p-1 border rounded"
            onBlur={handleTitleSubmit}
          />
        </form>
      ) : (
        <h3
          className="font-semibold cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h3>
      )}
      
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 hover:bg-gray-200 rounded"
      >
        <MoreHorizontal size={16} />
      </button>
      
      {showMenu && (
        <div className="absolute right-0 top-8 bg-white rounded shadow-lg py-2 z-10">
          <button
            onClick={() => {
              setIsEditing(true);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-1 hover:bg-gray-100"
          >
            Edit Title
          </button>
          <button
            onClick={() => {
              onDelete();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-1 hover:bg-gray-100 text-red-600"
          >
            Delete List
          </button>
        </div>
      )}
    </div>
  );
};