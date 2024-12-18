import { useCallback } from 'react';
import { useBoardStore } from '../../../store/boardStore';
import { toast } from 'react-hot-toast';

export const useBoard = () => {
  const { activeBoard, updateCardPosition } = useBoardStore();

  const moveCard = useCallback(async (
    cardId: string,
    sourceListId: string,
    destinationListId: string
  ) => {
    if (!activeBoard) {
      console.error('No active board found');
      toast.error('Unable to move card - board not found');
      return;
    }

    if (!cardId || !sourceListId || !destinationListId) {
      console.error('Invalid card movement parameters:', { cardId, sourceListId, destinationListId });
      toast.error('Unable to move card - invalid parameters');
      return;
    }

    console.log('Moving card:', {
      cardId,
      sourceListId,
      destinationListId
    });

    try {
      // Find the source and destination lists
      const sourceList = activeBoard.Lists?.find(list => list.id === sourceListId);
      const destList = activeBoard.Lists?.find(list => list.id === destinationListId);

      if (!sourceList || !destList) {
        throw new Error('Source or destination list not found');
      }

      // Find the card in the source list
      const card = sourceList.Cards?.find(c => c.id === cardId);
      if (!card) {
        throw new Error('Card not found in source list');
      }

      // Get the new position (at the end of the list)
      const newPosition = destList.Cards?.length || 0;

      // Optimistically update UI
      updateCardPosition(cardId, sourceListId, destinationListId, newPosition);

      // Here you would typically make an API call to persist the change
      // await boardApi.moveCard(cardId, sourceListId, destinationListId);

      toast.success('Card moved successfully');
    } catch (error) {
      console.error('Failed to move card:', error);
      // Revert the optimistic update
      updateCardPosition(cardId, destinationListId, sourceListId, 0);
      toast.error('Failed to move card');
      throw error;
    }
  }, [activeBoard, updateCardPosition]);

  return { moveCard };
};