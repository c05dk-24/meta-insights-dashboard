import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useCardMove = (onMoveCard: (newListId: string) => Promise<void>) => {
  const [isMoving, setIsMoving] = useState(false);

  const handleMoveCard = async (newListId: string) => {
    try {
      setIsMoving(true);
      await onMoveCard(newListId);
      toast.success('Card moved successfully');
    } catch (error) {
      toast.error('Failed to move card');
      console.error('Error moving card:', error);
    } finally {
      setIsMoving(false);
    }
  };

  return { isMoving, handleMoveCard };
};