export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface MetaInsightsParams {
  accountId: string;
  start_date: string;
  end_date: string;
  campaignId?: string;
  level?: 'campaign' | 'adset' | 'ad';
}

export interface InsightsResponse {
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
}

export interface MetaInsight {
  id: string;
  date: string;
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
}

export interface Campaign {
  id: string;
  name: string;
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
}

export interface AdSet extends Campaign {}

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

export interface BoardCard extends Card {
  id: string;
  title: string;
  description?: string;
  listId: string;
  position: number;
  labels: string[];
  comments: Comment[];
}

export interface BoardList {
  id: string;
  title: string;
  cards: BoardCard[];
}