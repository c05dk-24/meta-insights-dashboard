import React, { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
  isDisabled?: boolean;
}

export const CommentInput: React.FC<Props> = ({ onSubmit, isDisabled }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 border dark:border-gray-600 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        disabled={isDisabled}
      />
      <button
        type="submit"
        disabled={!comment.trim() || isDisabled}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        Add Comment
      </button>
    </form>
  );
};