import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { toast } from 'react-hot-toast';

export const useCards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  console.log('useCards hook initialized');

  return {
    useAddCard: () =>
      useMutation({
        mutationFn: async ({ listId, title }: { listId: string; title: string }) => {
          console.log('Adding card:', { listId, title });
          const { data } = await axios.post(`/api/lists/${listId}/cards`, { title });
          console.log('Card creation response:', data);
          return data;
        },
        onSuccess: () => {
          console.log('Card added successfully, invalidating queries');
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Card added successfully');
        },
        onError: (error: any) => {
          console.error('Card creation error:', error.response?.data || error);
          toast.error(error.response?.data?.message || 'Failed to add card');
        }
      }),

    useUpdateCard: () =>
      useMutation({
        mutationFn: async ({ cardId, updates }: { cardId: string; updates: any }) => {
          console.log('Updating card:', { cardId, updates });
          const { data } = await axios.put(`/api/cards/${cardId}`, updates);
          console.log('Card update response:', data);
          return data;
        },
        onSuccess: () => {
          console.log('Card updated successfully, invalidating queries');
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Card updated successfully');
        },
        onError: (error: any) => {
          console.error('Card update error:', error.response?.data || error);
          toast.error(error.response?.data?.message || 'Failed to update card');
        }
      })
  };
};