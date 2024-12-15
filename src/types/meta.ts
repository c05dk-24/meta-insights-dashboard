export interface Board {
  id: string;
  title: string;
  user_id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  Lists?: List[];
}

export interface List {
  id: string;
  title: string;
  board_id: string;
  position: number;
  created_at: string;
  updated_at: string;
  Cards?: Card[];
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  list_id: string;
  position: number;
  due_date?: string;
  assignee_id?: string;
  created_at: string;
  updated_at: string;
  Labels?: Label[];
  Comments?: Comment[];
}

export interface Label {
  id: string;
  name: string;
  color: string;
  board_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  text: string;
  card_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface MetaInsight {
  id: string;
  user_id: string;
  date: string;
  impressions: number;
  reach: number;
  engagement: number;
  clicks: number;
  page_id: string;
  created_at: string;
  updated_at: string;
}