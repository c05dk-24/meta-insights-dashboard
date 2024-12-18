import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { CardService } from '../services/cards/CardService';
import { toast } from 'react-hot-toast';

export const useCards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const cardService = new CardService(axios);

  return {
    useMoveCard: () =>
      useMutation({
        mutationFn: async ({ 
          cardId, 
          sourceListId, 
          destinationListId,
          position 
        }: { 
          cardId: string; 
          sourceListId: string; 
          destinationListId: string;
          position: number;
        }) => {
          return cardService.moveCard(cardId, sourceListId, destinationListId, position);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Card moved successfully');
        },
        onError: (error: any) => {
          console.error('Failed to move card:', error);
          toast.error(error.response?.data?.message || 'Failed to move card');
        }
      })
  };
};