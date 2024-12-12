export interface Card {
  id: string;
  title: string;
  description?: string;
  list_id: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface List {
  id: string;
  title: string;
  board_id: string;
  position: number;
  cards: Card[];
  created_at: string;
  updated_at: string;
}

export interface Board {
  id: string;
  title: string;
  user_id: string;
  lists: List[];
  created_at: string;
  updated_at: string;
}