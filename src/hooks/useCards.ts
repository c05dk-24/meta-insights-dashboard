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
          destinationListId 
        }: { 
          cardId: string; 
          sourceListId: string; 
          destinationListId: string; 
        }) => {
          return cardService.moveCard(cardId, sourceListId, destinationListId);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
        onError: (error: any) => {
          console.error('Failed to move card:', error);
          toast.error(error.response?.data?.message || 'Failed to move card');
        }
      })
  };
};