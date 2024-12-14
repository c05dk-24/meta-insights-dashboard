// Update InsightsResponse interface
export interface InsightsResponse {
  impressions: number;
  reach: number;
  leads: number;
  costPerLead: number;
  amountSpent: number;
  data?: any[]; // Add optional data property for API responses
}

// Update List interface to match BoardList
export interface List {
  id: string;
  title: string;
  cards: Card[];
  boardId: string;
  position: number;
}

// Update DateRange interface
export interface DateRange {
  from: Date;
  to: Date;
  startDate?: string;
  endDate?: string;
}