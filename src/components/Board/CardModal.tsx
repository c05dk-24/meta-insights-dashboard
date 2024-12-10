import React, { useState } from 'react';
import { X, Calendar, Tag, User, MessageSquare } from 'lucide-react';
import { BoardCard, Comment } from '../../types/meta';
import { format } from 'date-fns';

interface Props {
  card: BoardCard;
  listId: string;
  onClose: () => void;
  onUpdate: (updates: Partial<BoardCard>) => void;
}

export const CardModal: React.FC<Props> = ({ card, listId, onClose, onUpdate }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      title: title.trim(),
      description: description.trim(),
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: crypto.randomUUID(),
        text: newComment.trim(),
        author: 'Current User',
        createdAt: new Date().toISOString(),
      };
      onUpdate({
        comments: [...card.comments, comment],
      });
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-3 sm:p-4 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold">Edit Card</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline-block w-4 h-4 mr-1" />
                  Due Date
                </label>
                <input
                  type="date"
                  value={card.dueDate || ''}
                  onChange={(e) => onUpdate({ dueDate: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="inline-block w-4 h-4 mr-1" />
                  Assignee
                </label>
                <input
                  type="text"
                  value={card.assignee || ''}
                  onChange={(e) => onUpdate({ assignee: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Assign to..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Tag className="inline-block w-4 h-4 mr-1" />
                Labels
              </label>
              <div className="flex flex-wrap gap-2">
                {card.labels.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">
              <MessageSquare className="inline-block w-5 h-5 mr-2" />
              Comments
            </h3>
            
            <form onSubmit={handleAddComment} className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-2 border rounded mb-2"
                rows={2}
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
              >
                Add Comment
              </button>
            </form>

            <div className="space-y-4">
              {card.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), 'MMM d, yyyy HH:mm')}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};