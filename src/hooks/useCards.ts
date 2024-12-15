import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { BoardCard } from '../types/meta';
import { toast } from 'react-hot-toast';

export const useCards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return {
    useCard: (cardId: string) =>
      useQuery({
        queryKey: ['cards', cardId],
        queryFn: async () => {
          const { data } = await axios.get(`/cards/${cardId}`);
          return data;
        },
        enabled: !!cardId
      }),

    useUpdateCard: () =>
      useMutation({
        mutationFn: async ({ cardId, updates }: { cardId: string; updates: Partial<BoardCard> }) => {
          const { data } = await axios.put(`/cards/${cardId}`, updates);
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Card updated successfully');
        },
        onError: () => {
          toast.error('Failed to update card');
        }
      }),

    useAddComment: () =>
      useMutation({
        mutationFn: async ({ cardId, text }: { cardId: string; text: string }) => {
          const { data } = await axios.post(`/cards/${cardId}/comments`, { text });
          return data;
        },
        onSuccess: (_, { cardId }) => {
          queryClient.invalidateQueries({ queryKey: ['cards', cardId] });
          toast.success('Comment added');
        },
        onError: () => {
          toast.error('Failed to add comment');
        }
      }),

    useAddChecklistItem: () =>
      useMutation({
        mutationFn: async ({ cardId, text }: { cardId: string; text: string }) => {
          const { data } = await axios.post(`/cards/${cardId}/checklist`, { text });
          return data;
        },
        onSuccess: (_, { cardId }) => {
          queryClient.invalidateQueries({ queryKey: ['cards', cardId] });
          toast.success('Checklist item added');
        },
        onError: () => {
          toast.error('Failed to add checklist item');
        }
      }),

    useToggleChecklistItem: () =>
      useMutation({
        mutationFn: async ({ cardId, itemId }: { cardId: string; itemId: string }) => {
          const { data } = await axios.put(`/cards/${cardId}/checklist/${itemId}`);
          return data;
        },
        onSuccess: (_, { cardId }) => {
          queryClient.invalidateQueries({ queryKey: ['cards', cardId] });
        }
      })
  };
};