import { StateCreator } from 'zustand';
import { BoardStore, BoardState, BoardActions } from './types';
import { v4 as uuidv4 } from 'uuid';
import { useAxios } from '../../hooks/useAxios';

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
      const axios = useAxios();
      const { data } = await axios.get(`/api/boards?userId=${userId}`);
      set({ boards: data, activeBoard: data[0] || null });
    } catch (error) {
      console.error('Failed to fetch boards:', error);
      set({ boards: [], activeBoard: null });
    }
  },

  moveCardToList: (sourceListId, targetListId, cardId) => {
    set((state) => {
      if (!state.activeBoard) return state;
      
      const newLists = state.activeBoard.lists.map(list => {
        if (list.id === sourceListId) {
          return {
            ...list,
            cards: list.cards.filter(card => card.id !== cardId)
          };
        }
        if (list.id === targetListId) {
          const cardToMove = state.activeBoard?.lists
            .find(l => l.id === sourceListId)?.cards
            .find(c => c.id === cardId);
            
          if (cardToMove) {
            return {
              ...list,
              cards: [...list.cards, { ...cardToMove, list_id: targetListId }]
            };
          }
        }
        return list;
      });

      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: newLists
        }
      };
    });
  },

  // ... rest of the actions remain the same
});