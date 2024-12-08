export interface MetaInsight {
  id: string;
  date: string;
  impressions: number;
  reach: number;
  engagement: number;
  clicks: number;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface BoardCard {
  id: string;
  title: string;
  description: string;
  labels: string[];
  dueDate?: string;
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
  comments: Comment[];
  position: number;
  listId: string;
}

export interface BoardList {
  id: string;
  title: string;
  cards: BoardCard[];
  position: number;
  boardId: string;
}

export interface Board {
  id: string;
  title: string;
  lists: BoardList[];
  userId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export type LabelColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple';