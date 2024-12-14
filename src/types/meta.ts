// Update the existing types file to include these interfaces if they don't exist
export interface Board {
  id: string;
  title: string;
  lists: List[];
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  position: number;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  listId: string;
  position: number;
  labels: string[];
  dueDate?: string;
  assignee?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}