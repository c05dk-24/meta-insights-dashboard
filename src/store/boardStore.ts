```tsx
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

export const useBoardStore = create<BoardState>()((set) => ({
  boards: [],
  activeBoard: null,
  
  setActiveBoard: (board) => set({ activeBoard: board }),
  
  updateCardPosition: (cardId, sourceListId, destinationListId, newIndex) => {
    set((state) => {
      if (!state.activeBoard) return state;

      const newBoard = { ...state.activeBoard };
      const newLists = [...(newBoard.Lists || [])];

      const sourceList = newLists.find(list => list.id === sourceListId);
      const destList = newLists.find(list => list.id === destinationListId);

      if (!sourceList || !destList) return state;

      sourceList.Cards = sourceList.Cards || [];
      destList.Cards = destList.Cards || [];

      const cardIndex = sourceList.Cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) return state;

      const [movedCard] = sourceList.Cards.splice(cardIndex, 1);
      destList.Cards.splice(newIndex, 0, {
        ...movedCard,
        list_id: destinationListId
      });

      newBoard.Lists = newLists;

      return {
        ...state,
        activeBoard: newBoard
      };
    });
  },

  addList: (title) => set((state) => {
    if (!state.activeBoard) return state;
    return {
      ...state,
      activeBoard: {
        ...state.activeBoard,
        Lists: [
          ...(state.activeBoard.Lists || []),
          {
            id: crypto.randomUUID(),
            title,
            Cards: [],
            position: state.activeBoard.Lists?.length || 0
          }
        ]
      }
    };
  }),

  // ... rest of the implementation
}));
```