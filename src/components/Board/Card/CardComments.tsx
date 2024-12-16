import React, { useState } from 'react';
import { format } from 'date-fns';
import { useCardStore } from '../../../store/cardStore';
import { useAuth } from '../../../hooks/useAuth';

interface Props {
  cardId: string;
}

export const CardComments: React.FC<Props> = ({ cardId }) => {
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const { comments, addComment } = useCardStore(
    (state) => ({
      comments: state.comments[cardId] || [],
      addComment: state.addComment,
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && user) {
      addComment(cardId, {
        text: comment.trim(),
        userId: user.id,
        author: user.name,
      });
      setComment('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border dark:border-gray-600 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          Add Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium dark:text-white">{comment.author}</span>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.created_at), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};