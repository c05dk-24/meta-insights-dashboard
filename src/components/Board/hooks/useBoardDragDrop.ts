import { DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-hot-toast';

export const useBoardDragDrop = (onMoveCard: (cardId: string, sourceListId: string, destinationListId: string) => Promise<void>) => {
  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list or no movement
    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }

    try {
      await onMoveCard(
        draggableId,
        source.droppableId,
        destination.droppableId
      );
    } catch (error) {
      console.error('Error moving card:', error);
      toast.error('Failed to move card');
    }
  };

  return { handleDragEnd };
};