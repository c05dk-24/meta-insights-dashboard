export interface MetaInsight {
  impressions: number;
  results: number;
  costPerResult: number;
  amountSpent: number;
}

export interface YearlyData {
  month: string;
  impressions: number;
  results: number;
  costPerResult: number;
  amountSpent: number;
}

export interface ChartData extends YearlyData {
  name: string;
}