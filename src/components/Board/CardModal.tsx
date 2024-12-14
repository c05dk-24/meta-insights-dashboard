import React, { useState } from 'react';
import { X, Calendar, Tag, User, MessageSquare } from 'lucide-react';
import { Card, Comment } from '../../types/meta';
import { format } from 'date-fns';

interface Props {
  card: Card;
  listId: string;
  onClose: () => void;
  onUpdate: (updates: Partial<Card>) => void;
}

export const CardModal: React.FC<Props> = ({ card, listId, onClose, onUpdate }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      title: title.trim(),
      description: description.trim() || undefined,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Omit<Comment, 'id'> = {
        text: newComment.trim(),
        cardId: card.id,
        userId: 'current-user', // This should come from auth context
        author: 'Current User', // This should come from auth context
        createdAt: new Date().toISOString(),
      };
      onUpdate({
        comments: [...card.comments, { ...comment, id: crypto.randomUUID() }]
      });
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Rest of the component remains the same */}
    </div>
  );
};