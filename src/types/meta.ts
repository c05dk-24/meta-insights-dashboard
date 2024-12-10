export interface MetaInsight {
  impressions: number;
  results: number;
  costPerResult: number;
  amountSpent: number;
  reach: number;
}

export interface YearlyData {
  month: string;
  impressions: number;
  results: number;
  costPerResult: number;
  amountSpent: number;
  reach: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}