export interface ChartData {
  month: string;
  leads: number;
  amountSpent: number;
  impressions: number;
  reach: number;
}

export interface ChartProps {
  data: ChartData[];
  isLoading?: boolean;
  error?: Error | null;
}

export interface TransformedData {
  data: ChartData[];
  isLoading: boolean;
  error: Error | null;
}