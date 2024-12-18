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

export const useBoardStore = create<BoardState>((set) => ({
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

      if (!sourceList || !destList) return state;

      // Find and remove card from source list
      const cardIndex = sourceList.Cards?.findIndex(card => card.id === cardId) ?? -1;
      if (cardIndex === -1) return state;

      const [movedCard] = sourceList.Cards?.splice(cardIndex, 1) || [];
      if (!movedCard) return state;

      // Insert card into destination list
      destList.Cards = destList.Cards || [];
      destList.Cards.splice(newIndex, 0, movedCard);

      // Update board with new lists
      newBoard.Lists = newLists;

      return {
        ...state,
        activeBoard: newBoard
      };
    });
  },

  addList: (title) => set((state) => {
    if (!state.activeBoard) return state;
    
    const newList: BoardList = {
      id: crypto.randomUUID(),
      title,
      board_id: state.activeBoard.id,
      position: state.activeBoard.Lists?.length || 0,
      Cards: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return {
      ...state,
      activeBoard: {
        ...state.activeBoard,
        Lists: [...(state.activeBoard.Lists || []), newList]
      }
    };
  }),

  // ... rest of the store methods remain the same
}));