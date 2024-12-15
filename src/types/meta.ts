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