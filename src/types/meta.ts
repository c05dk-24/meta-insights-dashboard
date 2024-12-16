export interface Label {
  id: string;
  name: string;
  color: string;
  board_id?: string;
  created_at?: string;
}

export interface BoardList {
  id: string;
  title: string;
  board_id: string;
  position: number;
  Cards?: BoardCard[];
  created_at: string;
  updated_at: string;
}

export interface BoardCard {
  id: string;
  title: string;
  description?: string;
  list_id: string;
  position: number;
  due_date?: string;
  assignee_id?: string;
  Labels?: Label[];
  created_at: string;
  updated_at: string;
}

export interface Board {
  id: string;
  title: string;
  user_id: string;
  company_id: string;
  Lists?: BoardList[];
  created_at: string;
  updated_at: string;
}

export interface CardComment {
  id: string;
  text: string;
  user_id: string;
  card_id: string;
  author?: string;
  created_at: string;
}

export interface CardChecklist {
  id: string;
  text: string;
  completed: boolean;
  card_id: string;
  position: number;
}