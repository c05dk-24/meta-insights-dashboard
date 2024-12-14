import { Board, List, Card, Comment } from './meta';

export interface BoardState {
  boards: Board[];
  activeBoard: Board | null;
  setActiveBoard: (board: Board) => void;
  moveCard: (source: DragSource, destination: DragDestination) => void;
  addList: (title: string) => void;
  addCard: (listId: string, card: Omit<Card, 'id' | 'comments'>) => void;
  updateCard: (listId: string, cardId: string, updates: Partial<Card>) => void;
  deleteCard: (listId: string, cardId: string) => void;
  updateListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
}

export interface DragSource {
  droppableId: string;
  index: number;
}

export interface DragDestination extends DragSource {}