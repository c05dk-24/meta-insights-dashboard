import { useBoardStore } from '../../../../store/boardStore';
import { BoardCard } from '../../../../types/meta';
import { toast } from 'react-hot-toast';

export const useCardActions = (listId: string, cardId: string) => {
  const { updateCard, deleteCard, moveCardToList } = useBoardStore();

  const handleUpdate = (updates: Partial<BoardCard>) => {
    try {
      updateCard(listId, cardId, updates);
      toast.success('Card updated successfully');
    } catch (error) {
      toast.error('Failed to update card');
    }
  };

  const handleDelete = () => {
    try {
      deleteCard(listId, cardId);
      toast.success('Card deleted successfully');
    } catch (error) {
      toast.error('Failed to delete card');
    }
  };

  const handleMove = (targetListId: string) => {
    if (targetListId !== listId) {
      try {
        moveCardToList(listId, targetListId, cardId);
        toast.success('Card moved successfully');
      } catch (error) {
        toast.error('Failed to move card');
      }
    }
  };

  return {
    handleUpdate,
    handleDelete,
    handleMove
  };
};