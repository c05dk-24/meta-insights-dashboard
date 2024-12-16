import { Board, BoardList, BoardCard } from '../../types/meta';

export interface BoardState {
  boards: Board[];
  activeBoard: Board | null;
}

export interface BoardActions {
  setActiveBoard: (board: Board) => void;
  moveCardToList: (sourceListId: string, targetListId: string, cardId: string) => void;
  addList: (title: string) => void;
  addCard: (listId: string, card: Omit<BoardCard, 'id' | 'comments'>) => void;
  updateCard: (listId: string, cardId: string, updates: Partial<BoardCard>) => void;
  deleteCard: (listId: string, cardId: string) => void;
  updateListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
}

export type BoardStore = BoardState & BoardActions;