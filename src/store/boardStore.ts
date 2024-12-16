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
      
      const newLists = state.activeBoard.Lists?.map(list => {
        // Remove from source list
        if (list.id === sourceListId) {
          return {
            ...list,
            Cards: list.Cards?.filter(card => card.id !== cardId) || []
          };
        }
        // Add to destination list
        if (list.id === destinationListId) {
          const card = state.activeBoard?.Lists
            ?.find(l => l.id === sourceListId)
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
      }) || [];

      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          Lists: newLists,
        },
      };
    });
  },

  moveCardToList: (cardId, sourceListId, destinationListId) => {
    const { moveCard } = get();
    const destinationList = get().activeBoard?.Lists?.find(l => l.id === destinationListId);
    if (destinationList) {
      moveCard(cardId, sourceListId, destinationListId, (destinationList.Cards?.length || 0));
    }
  },

  addList: (title) => {
    set((state) => {
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
    });
  },

  addCard: (listId, card) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newCard: BoardCard = {
        id: crypto.randomUUID(),
        ...card,
        list_id: listId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      const newLists = state.activeBoard.Lists?.map(list =>
        list.id === listId
          ? { ...list, Cards: [...(list.Cards || []), newCard] }
          : list
      ) || [];
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          Lists: newLists
        }
      };
    });
  },

  updateListTitle: (listId, title) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.Lists?.map(list =>
        list.id === listId ? { ...list, title } : list
      ) || [];
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          Lists: newLists
        }
      };
    });
  },

  deleteList: (listId) => {
    set((state) => {
      if (!state.activeBoard) return state;
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          Lists: state.activeBoard.Lists?.filter(list => list.id !== listId) || []
        }
      };
    });
  },

  updateCard: (listId, cardId, updates) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.Lists?.map(list =>
        list.id === listId
          ? {
              ...list,
              Cards: list.Cards?.map(card =>
                card.id === cardId ? { ...card, ...updates } : card
              )
            }
          : list
      ) || [];
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          Lists: newLists
        }
      };
    });
  },

  deleteCard: (listId, cardId) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.Lists?.map(list =>
        list.id === listId
          ? {
              ...list,
              Cards: list.Cards?.filter(card => card.id !== cardId)
            }
          : list
      ) || [];
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          Lists: newLists
        }
      };
    });
  },
}));