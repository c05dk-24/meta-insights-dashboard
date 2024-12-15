import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { toast } from 'react-hot-toast';

export const useCards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return {
    useAddCard: () =>
      useMutation({
        mutationFn: async ({ listId, title }: { listId: string; title: string }) => {
          const { data } = await axios.post(`/lists/${listId}/cards`, { title });
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Card added successfully');
        },
        onError: () => {
          toast.error('Failed to add card');
        }
      }),

    useUpdateCard: () =>
      useMutation({
        mutationFn: async ({ cardId, updates }: { cardId: string; updates: any }) => {
          const { data } = await axios.put(`/cards/${cardId}`, updates);
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Card updated successfully');
        }
      }),

    useDeleteCard: () =>
      useMutation({
        mutationFn: async (cardId: string) => {
          await axios.delete(`/cards/${cardId}`);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Card deleted successfully');
        }
      })
  };
};