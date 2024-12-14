import { create } from 'zustand';
import { Board, List, Card } from '../types/meta';
import { BoardState, DragSource, DragDestination } from '../types/board';

export const useBoardStore = create<BoardState>((set) => ({
  boards: [],
  activeBoard: null,
  
  setActiveBoard: (board) => set({ activeBoard: board }),
  
  moveCard: (source: DragSource, destination: DragDestination) => 
    set((state) => {
      if (!state.activeBoard) return state;
      
      const newLists = [...state.activeBoard.lists];
      const sourceList = newLists.find(list => list.id === source.droppableId);
      const destList = newLists.find(list => list.id === destination.droppableId);
      
      if (!sourceList || !destList) return state;
      
      const [movedCard] = sourceList.cards.splice(source.index, 1);
      destList.cards.splice(destination.index, 0, movedCard);
      
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: newLists,
        },
      };
    }),

  addList: (title) => 
    set((state) => {
      if (!state.activeBoard) return state;
      const newList: List = {
        id: crypto.randomUUID(),
        title,
        boardId: state.activeBoard.id,
        position: state.activeBoard.lists.length,
        cards: [],
        createdAt: new Date().toISOString()
      };
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: [...state.activeBoard.lists, newList]
        }
      };
    }),

  // Rest of the store implementation remains the same
}));