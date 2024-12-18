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
    try {
      // Find the destination list and get the last position
      const destList = activeBoard?.Lists?.find(list => list.id === destinationListId);
      const newPosition = destList?.Cards?.length || 0;

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
    }
  }, [activeBoard, updateCardPosition]);

  return { moveCard };
};