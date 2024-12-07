import { create } from 'zustand';
import { MetaInsight } from '../types/meta';

interface MetaStore {
  insights: MetaInsight[];
  isLoading: boolean;
  error: string | null;
  fetchInsights: () => Promise<void>;
}

export const useMetaStore = create<MetaStore>((set) => ({
  insights: [],
  isLoading: false,
  error: null,
  fetchInsights: async () => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual Meta API call
      const response = await fetch('your-meta-api-endpoint');
      const data = await response.json();
      set({ insights: data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch insights', isLoading: false });
    }
  },
}));