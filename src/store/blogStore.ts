import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlogPreferences, GeneratedBlog } from '../types/blog';

interface BlogStore {
  preferences: BlogPreferences | null;
  history: GeneratedBlog[];
  setPreferences: (preferences: BlogPreferences) => void;
  addToHistory: (content: GeneratedBlog) => void;
  clearHistory: () => void;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set) => ({
      preferences: null,
      history: [],
      setPreferences: (preferences) => set({ preferences }),
      addToHistory: (content) =>
        set((state) => ({
          history: [content, ...state.history].slice(0, 50),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'blog-store',
    }
  )
);