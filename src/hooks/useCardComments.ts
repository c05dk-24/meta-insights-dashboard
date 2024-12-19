import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from './useSupabase';
import { CardService } from '../services/supabase/CardService';
import { toast } from 'react-hot-toast';

export const useCardComments = (cardId: string) => {
  const { supabase, isReady } = useSupabase();
  const queryClient = useQueryClient();
  const cardService = new CardService(supabase);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['card-comments', cardId],
    queryFn: () => cardService.getComments(cardId),
    enabled: isReady && !!cardId
  });

  const addComment = useMutation({
    mutationFn: ({ text, userId }: { text: string; userId: string }) =>
      cardService.addComment(cardId, text, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['card-comments', cardId]);
      toast.success('Comment added successfully');
    },
    onError: () => {
      toast.error('Failed to add comment');
    }
  });

  return {
    comments,
    isLoading,
    addComment
  };
};