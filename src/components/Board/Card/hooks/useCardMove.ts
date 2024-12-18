import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useCardMove = (onMoveCard: (newListId: string) => Promise<void>) => {
  const [isMoving, setIsMoving] = useState(false);

  const handleMoveCard = async (newListId: string) => {
    if (!newListId) {
      console.warn('No list ID provided for card move');
      return;
    }

    try {
      setIsMoving(true);
      await onMoveCard(newListId);
      toast.success('Card moved successfully');
    } catch (error) {
      console.error('Error moving card:', error);
      toast.error('Failed to move card');
    } finally {
      setIsMoving(false);
    }
  };

  return { isMoving, handleMoveCard };
};