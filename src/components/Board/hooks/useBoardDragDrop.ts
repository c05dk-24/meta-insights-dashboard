import { DropResult } from 'react-beautiful-dnd';
import { useBoardStore } from '../../../store/boardStore';
import { useCards } from '../../../hooks/useCards';
import { toast } from 'react-hot-toast';

export const useBoardDragDrop = () => {
  const { updateCardPosition } = useBoardStore();
  const { useMoveCard } = useCards();
  const moveCardMutation = useMoveCard();

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId: cardId } = result;

    // Dropped outside the list or no movement
    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }

    console.log('Card drag ended:', {
      cardId,
      sourceList: source.droppableId,
      destinationList: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index
    });

    try {
      // Optimistically update the UI
      updateCardPosition(
        cardId,
        source.droppableId,
        destination.droppableId,
        destination.index
      );
      
      // Make API call to persist the change
      await moveCardMutation.mutateAsync({
        cardId,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        position: destination.index
      });

    } catch (error) {
      // Revert optimistic update on failure
      updateCardPosition(
        cardId,
        destination.droppableId,
        source.droppableId,
        source.index
      );
      console.error('Failed to move card:', error);
      toast.error('Failed to move card');
    }
  };

  return { handleDragEnd };
};