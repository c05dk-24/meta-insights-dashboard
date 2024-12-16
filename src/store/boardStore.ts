import { create } from 'zustand';
import { Board, BoardList, BoardCard } from '../types/meta';
import { v4 as uuidv4 } from 'uuid';

interface BoardStore {
  boards: Board[];
  activeBoard: Board | null;
  setActiveBoard: (board: Board) => void;
  moveCard: (source: any, destination: any) => void;
  moveCardToList: (sourceListId: string, targetListId: string, cardId: string) => void;
  addList: (title: string) => void;
  addCard: (listId: string, card: Omit<BoardCard, 'id' | 'comments'>) => void;
  updateCard: (listId: string, cardId: string, updates: Partial<BoardCard>) => void;
  deleteCard: (listId: string, cardId: string) => void;
  updateListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [{
    id: '1',
    title: 'Main Board',
    lists: []
  }],
  activeBoard: {
    id: '1',
    title: 'Main Board',
    lists: []
  },
  setActiveBoard: (board) => set({ activeBoard: board }),
  
  moveCard: (source, destination) => {
    set((state) => {
      if (!state.activeBoard) return state;
      
      const newLists = [...state.activeBoard.lists];
      const sourceList = newLists[parseInt(source.droppableId)];
      const destList = newLists[parseInt(destination.droppableId)];
      
      const [movedCard] = sourceList.cards.splice(source.index, 1);
      destList.cards.splice(destination.index, 0, movedCard);
      
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: newLists,
        },
      };
    });
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

  addList: (title) => {
    set((state) => {
      if (!state.activeBoard) return state;
      return {
        ...state,
        activeBoard: {
          ...state.activeBoard,
          lists: [
            ...state.activeBoard.lists,
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
      const newLists = state.activeBoard.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [...list.cards, { ...card, id: uuidv4(), comments: [] }]
          };
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

  updateCard: (listId, cardId, updates) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.map(card => 
              card.id === cardId ? { ...card, ...updates } : card
            )
          };
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

  deleteCard: (listId, cardId) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.filter(card => card.id !== cardId)
          };
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

  updateListTitle: (listId, title) => {
    set((state) => {
      if (!state.activeBoard) return state;
      const newLists = state.activeBoard.lists.map(list =>
        list.id === listId ? { ...list, title } : list
      );
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
          lists: state.activeBoard.lists.filter(list => list.id !== listId)
        }
      };
    });
  },
}));