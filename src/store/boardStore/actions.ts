import { StateCreator } from 'zustand';
import { BoardStore, BoardState, BoardActions } from './types';
import { v4 as uuidv4 } from 'uuid';
import { boardService } from '../../services/boardService';

export const createBoardActions: StateCreator<
  BoardStore,
  [],
  [],
  BoardActions
> = (set, get) => ({
  setActiveBoard: (board) => set({ activeBoard: board }),
  
  setCurrentUser: (userId) => set({ currentUser: userId }),

  fetchUserBoards: async (userId) => {
    try {
      const boards = await boardService.fetchUserBoards(userId);
      set({ boards, activeBoard: boards[0] || null });
    } catch (error) {
      console.error('Failed to fetch boards:', error);
      set({ boards: [], activeBoard: null });
    }
  },

  moveCardToList: (sourceListId, targetListId, cardId) => {
    set((state) => {
      if (!state.activeBoard) return state;
      
      const newLists = state.activeBoard.lists?.map(list => {
        if (list.id === sourceListId) {
          return {
            ...list,
            cards: list.cards?.filter(card => card.id !== cardId) || []
          };
        }
        if (list.id === targetListId) {
          const cardToMove = state.activeBoard?.lists
            ?.find(l => l.id === sourceListId)?.cards
            ?.find(c => c.id === cardId);
            
          if (cardToMove) {
            return {
              ...list,
              cards: [...(list.cards || []), { ...cardToMove, list_id: targetListId }]
            };
          }
        }
        return list;
      }) || [];

      return {
        ...state,
        activeBoard: state.activeBoard ? {
          ...state.activeBoard,
          lists: newLists
        } : null
      };
    });
  },

  addList: (title) => {
    set((state) => {
      if (!state.activeBoard) return state;
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: [
            ...(state.activeBoard.lists || []),
            {
              id: uuidv4(),
              title,
              cards: []
            }
          ]
        }
      };
    });
  },

  addCard: (listId, card) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.lists?.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [...(list.cards || []), { ...card, id: uuidv4(), comments: [] }]
          };
        }
        return list;
      }) || [];

      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: newLists
        }
      };
    });
  },

  updateCard: (listId, cardId, updates) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.lists?.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards?.map(card => 
              card.id === cardId ? { ...card, ...updates } : card
            ) || []
          };
        }
        return list;
      }) || [];

      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: newLists
        }
      };
    });
  },

  deleteCard: (listId, cardId) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.lists?.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards?.filter(card => card.id !== cardId) || []
          };
        }
        return list;
      }) || [];

      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: newLists
        }
      };
    });
  },

  updateListTitle: (listId, title) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.lists?.map(list =>
        list.id === listId ? { ...list, title } : list
      ) || [];

      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: newLists
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
          lists: state.activeBoard.lists?.filter(list => list.id !== listId) || []
        }
      };
    });
  }
});