import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { CommentService } from '../services/cards/CommentService';
import { toast } from 'react-hot-toast';

export const useCardComments = (cardId: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const commentService = new CommentService(axios);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['card-comments', cardId],
    queryFn: () => commentService.getComments(cardId),
    enabled: !!cardId
  });

  const addComment = useMutation({
    mutationFn: ({ text, userId }: { text: string; userId: string }) =>
      commentService.addComment(cardId, text, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['card-comments', cardId]);
      toast.success('Comment added successfully');
    },
    onError: () => {
      toast.error('Failed to add comment');
    }
  });

  const deleteComment = useMutation({
    mutationFn: (commentId: string) => commentService.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['card-comments', cardId]);
      toast.success('Comment deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete comment');
    }
  });

  return {
    comments,
    isLoading,
    addComment,
    deleteComment
  };
};