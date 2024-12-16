import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './useAuth';
import { CardComment } from '../types/meta';

export const useCardComments = (cardId: string) => {
  const [comments, setComments] = useState<CardComment[]>([]);
  const { user } = useAuth();

  const addComment = ({ text }: { text: string; userId: string; cardId: string }) => {
    if (!user) return;

    const newComment: CardComment = {
      id: uuidv4(),
      text,
      user_id: user.id,
      card_id: cardId,
      author: user.name,
      created_at: new Date().toISOString()
    };

    setComments([newComment, ...comments]);
  };

  return {
    comments,
    addComment
  };
};