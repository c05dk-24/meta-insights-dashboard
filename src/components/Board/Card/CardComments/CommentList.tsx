import React from 'react';
import { format } from 'date-fns';
import { Comment } from '../../../../types/meta';

interface Props {
  comments: Comment[];
}

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium dark:text-white">{comment.user_id}</span>
            <span className="text-sm text-gray-500">
              {format(new Date(comment.created_at), 'MMM d, yyyy HH:mm')}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};