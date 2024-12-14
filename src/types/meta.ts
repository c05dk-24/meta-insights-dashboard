// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Meta-related interfaces
export interface MetaInsight extends BaseEntity {
  date: string;
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
  pageId: string;
  userId: string;
}

export interface Campaign extends BaseEntity {
  name: string;
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
  objective?: string;
  status?: string;
}

export interface AdSet extends Campaign {}

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

export interface BoardList extends BaseEntity {
  title: string;
  cards: BoardCard[];
}

export interface BoardCard extends Omit<Card, 'listId'> {
  listId: string;
}

export interface Comment extends BaseEntity {
  text: string;
  cardId: string;
  userId: string;
  author: string;
}

// API-related interfaces
export interface DateRange {
  from: Date;
  to: Date;
  startDate?: string;
  endDate?: string;
}

export interface MetaInsightsParams {
  accountId: string;
  start_date: string;
  end_date: string;
  campaignId?: string;
  level?: 'campaign' | 'adset' | 'ad';
}

// API configuration
export const API_CONFIG = {
  META: {
    FIELDS: {
      INSIGHTS: ['impressions', 'reach', 'actions', 'spend'],
      CAMPAIGNS: ['campaign_id', 'campaign_name', 'objective', 'status'],
      ADSETS: ['adset_id', 'adset_name', 'status', 'targeting']
    }
  }
} as const;