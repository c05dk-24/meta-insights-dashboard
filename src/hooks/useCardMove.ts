import { useState } from 'react';
import { useAxios } from './useAxios';
import { CardMoveService } from '../services/cards/CardMoveService';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const useCardMove = () => {
  const [isMoving, setIsMoving] = useState(false);
  const axios = useAxios();
  const cardMoveService = new CardMoveService(axios);
  const queryClient = useQueryClient();

  const moveCard = async (cardId: string, sourceListId: string, destinationListId: string) => {
    if (sourceListId === destinationListId) return;

    setIsMoving(true);
    try {
      await cardMoveService.moveCard(cardId, destinationListId);
      
      // Invalidate queries to refresh board data
      await queryClient.invalidateQueries({ queryKey: ['boards'] });
      
      toast.success('Card moved successfully');
    } catch (error) {
      console.error('Failed to move card:', error);
      toast.error('Failed to move card');
      throw error;
    } finally {
      setIsMoving(false);
    }
  };

  return {
    isMoving,
    moveCard
  };
};