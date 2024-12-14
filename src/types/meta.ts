// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Meta-related interfaces
export interface DateRange {
  from: Date;
  to: Date;
}

export interface MetaInsight extends BaseEntity {
  date: string;
  date_start?: string;
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
  spend?: string;
  actions?: Array<{
    action_type: string;
    value: string;
  }>;
  pageId: string;
  userId: string;
}

export interface InsightsResponse {
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
  data?: MetaInsight[];
}

// Board-related interfaces
export interface Board extends BaseEntity {
  title: string;
  userId: string;
  lists: List[];
}

export interface List extends BaseEntity {
  title: string;
  boardId: string;
  position: number;
  cards: Card[];
}

export interface Card extends BaseEntity {
  title: string;
  description?: string;
  listId: string;
  position: number;
  labels: string[];
  dueDate?: string;
  assignee?: string;
  comments: Comment[];
}

export interface Comment extends BaseEntity {
  text: string;
  cardId: string;
  userId: string;
  author: string;
}

// API-related interfaces
export interface MetaInsightsParams {
  accountId: string;
  start_date: string;
  end_date: string;
  campaignId?: string;
  level?: 'campaign' | 'adset' | 'ad';
}