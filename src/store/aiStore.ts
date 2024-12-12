import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences, GeneratedContent } from '../types/ai';

interface AIStore {
  preferences: UserPreferences | null;
  history: GeneratedContent[];
  setPreferences: (preferences: UserPreferences) => void;
  addToHistory: (content: GeneratedContent) => void;
  clearHistory: () => void;
}

export const useAIStore = create<AIStore>()(
  persist(
    (set) => ({
      preferences: null,
      history: [],
      setPreferences: (preferences) => set({ preferences }),
      addToHistory: (content) =>
        set((state) => ({
          history: [content, ...state.history].slice(0, 50), // Keep last 50 items
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'ai-store',
    }
  )
);