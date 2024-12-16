import { create } from 'zustand';
import { Board, BoardList, BoardCard } from '../types/meta';
import { v4 as uuidv4 } from 'uuid';

interface BoardStore {
  boards: Board[];
  activeBoard: Board | null;
  setActiveBoard: (board: Board) => void;
  moveCardToList: (sourceListId: string, targetListId: string, cardId: string) => void;
  // ... other actions
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],
  activeBoard: null,
  
  setActiveBoard: (board) => set({ activeBoard: board }),
  
  moveCardToList: (sourceListId, targetListId, cardId) => {
    set((state) => {
      if (!state.activeBoard) return state;
      
      const newLists = state.activeBoard.Lists?.map(list => {
        if (list.id === sourceListId) {
          return {
            ...list,
            Cards: list.Cards?.filter(card => card.id !== cardId) || []
          };
        }
        if (list.id === targetListId) {
          const cardToMove = state.activeBoard?.Lists
            ?.find(l => l.id === sourceListId)?.Cards
            ?.find(c => c.id === cardId);
            
          if (cardToMove) {
            return {
              ...list,
              Cards: [...(list.Cards || []), { ...cardToMove, list_id: targetListId }]
            };
          }
        }
        return list;
      }) || [];

      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          Lists: newLists
        }
      };
    });
  },
  // ... other actions
}));