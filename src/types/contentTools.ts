export interface RemixRequest {
  content: string;
  formats: string[];
  tone: string;
}

export interface RemixResponse {
  results: {
    format: string;
    content: string;
  }[];
}

export interface ContentToolsState {
  isProcessing: boolean;
  error: string | null;
  results: RemixResponse | null;
}