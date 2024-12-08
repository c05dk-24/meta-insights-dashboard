export interface MetaInsight {
  impressions: number;
  reach: number;
  results: number;
  amountSpent: number;
  costPerResult: number;
}

export interface YearlyData {
  month: string;
  results: number;
  amountSpent: number;
  impressions: number;
  reach: number;
}

export interface ChartData {
  name: string;
  results: number;
  amountSpent: number;
}