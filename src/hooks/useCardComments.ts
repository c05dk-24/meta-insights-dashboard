import { useState, useEffect } from 'react';
import { apiClient } from '../services/api/config';
import { Comment } from '../types/meta';
import { toast } from 'react-hot-toast';

interface AddCommentParams {
  text: string;
  cardId: string;
}

export const useCardComments = (cardId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await apiClient.get<Comment[]>(`/cards/${cardId}/comments`);
        setComments(data);
      } catch (error) {
        toast.error('Failed to load comments');
      }
    };

    fetchComments();
  }, [cardId]);

  const addComment = async ({ text, cardId }: AddCommentParams) => {
    try {
      const { data } = await apiClient.post<Comment>(`/cards/${cardId}/comments`, {
        text
      });
      setComments([data, ...comments]);
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  return {
    comments,
    addComment
  };
};