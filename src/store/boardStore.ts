import { create } from 'zustand';
import { Board, BoardList, BoardCard } from '../types/meta';

interface BoardStore {
  boards: Board[];
  activeBoard: Board | null;
  setActiveBoard: (board: Board) => void;
  moveCard: (cardId: string, sourceListId: string, destinationListId: string, destinationIndex: number) => void;
  moveCardToList: (cardId: string, sourceListId: string, destinationListId: string) => void;
  addList: (title: string) => void;
  addCard: (listId: string, card: Omit<BoardCard, 'id' | 'comments'>) => void;
  updateCard: (listId: string, cardId: string, updates: Partial<BoardCard>) => void;
  deleteCard: (listId: string, cardId: string) => void;
  updateListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  activeBoard: null,
  setActiveBoard: (board) => set({ activeBoard: board }),
  
  moveCard: (cardId, sourceListId, destinationListId, destinationIndex) => {
    set((state) => {
      if (!state.activeBoard) return state;
      
      const newLists = state.activeBoard.lists.map(list => {
        // Remove from source list
        if (list.id === sourceListId) {
          return {
            ...list,
            Cards: list.Cards?.filter(card => card.id !== cardId) || []
          };
        }
        // Add to destination list
        if (list.id === destinationListId) {
          const card = state.activeBoard?.lists
            .find(l => l.id === sourceListId)
            ?.Cards?.find(c => c.id === cardId);
          
          if (card) {
            const newCards = [...(list.Cards || [])];
            newCards.splice(destinationIndex, 0, { ...card, list_id: destinationListId });
            return {
              ...list,
              Cards: newCards
            };
          }
        }
        return list;
      });

      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: newLists,
        },
      };
    });
  },

  moveCardToList: (cardId, sourceListId, destinationListId) => {
    const { moveCard } = get();
    const destinationList = get().activeBoard?.lists.find(l => l.id === destinationListId);
    if (destinationList) {
      moveCard(cardId, sourceListId, destinationListId, (destinationList.Cards?.length || 0));
    }
  },

  // ... rest of the store methods remain the same
}));