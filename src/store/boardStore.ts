import { create } from 'zustand';
import { Board, BoardList, BoardCard } from '../types/meta';

interface BoardState {
  boards: Board[];
  activeBoard: Board | null;
  setActiveBoard: (board: Board) => void;
  updateCardPosition: (
    cardId: string, 
    sourceListId: string, 
    destinationListId: string, 
    newIndex: number
  ) => void;
  addList: (title: string) => void;
  addCard: (listId: string, card: Omit<BoardCard, 'id' | 'comments'>) => void;
  updateCard: (listId: string, cardId: string, updates: Partial<BoardCard>) => void;
  deleteCard: (listId: string, cardId: string) => void;
  updateListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  activeBoard: null,
  
  setActiveBoard: (board) => set({ activeBoard: board }),
  
  updateCardPosition: (cardId, sourceListId, destinationListId, newIndex) => {
    set((state) => {
      if (!state.activeBoard) return state;

      const newBoard = { ...state.activeBoard };
      const newLists = [...newBoard.Lists || []];

      // Find source and destination lists
      const sourceList = newLists.find(list => list.id === sourceListId);
      const destList = newLists.find(list => list.id === destinationListId);

      if (!sourceList || !destList) {
        console.error('Source or destination list not found:', { sourceListId, destinationListId });
        return state;
      }

      // Ensure Cards arrays exist
      sourceList.Cards = sourceList.Cards || [];
      destList.Cards = destList.Cards || [];

      // Find and remove card from source list
      const cardIndex = sourceList.Cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) {
        console.error('Card not found in source list:', cardId);
        return state;
      }

      // Remove card from source list
      const [movedCard] = sourceList.Cards.splice(cardIndex, 1);

      // Insert card into destination list
      destList.Cards.splice(newIndex, 0, {
        ...movedCard,
        list_id: destinationListId
      });

      // Update board with new lists
      newBoard.Lists = newLists;

      console.log('Card moved:', {
        cardId,
        from: sourceListId,
        to: destinationListId,
        newIndex
      });

      return {
        ...state,
        activeBoard: newBoard
      };
    });
  },

  // ... rest of the store implementation
}));