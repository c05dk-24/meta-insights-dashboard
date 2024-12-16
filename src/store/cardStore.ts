import { create } from 'zustand';
import { Label, CardComment, CardChecklist } from '../types/meta';

interface CardStore {
  labels: Record<string, Label[]>;
  availableLabels: Label[];
  comments: Record<string, CardComment[]>;
  checklists: Record<string, CardChecklist[]>;
  addLabel: (cardId: string, label: Label) => void;
  removeLabel: (cardId: string, labelId: string) => void;
  addComment: (cardId: string, comment: Omit<CardComment, 'id' | 'created_at'>) => void;
  addChecklistItem: (cardId: string, text: string) => void;
  toggleChecklistItem: (cardId: string, itemId: string) => void;
  removeChecklistItem: (cardId: string, itemId: string) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  labels: {},
  availableLabels: [
    { id: '1', name: 'High Priority', color: 'bg-red-500' },
    { id: '2', name: 'Medium Priority', color: 'bg-yellow-500' },
    { id: '3', name: 'Low Priority', color: 'bg-green-500' },
    { id: '4', name: 'Bug', color: 'bg-purple-500' },
    { id: '5', name: 'Feature', color: 'bg-blue-500' },
  ],
  comments: {},
  checklists: {},

  addLabel: (cardId, label) =>
    set((state) => ({
      labels: {
        ...state.labels,
        [cardId]: [...(state.labels[cardId] || []), label],
      },
    })),

  removeLabel: (cardId, labelId) =>
    set((state) => ({
      labels: {
        ...state.labels,
        [cardId]: (state.labels[cardId] || []).filter((l) => l.id !== labelId),
      },
    })),

  addComment: (cardId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [cardId]: [
          {
            id: crypto.randomUUID(),
            ...comment,
            created_at: new Date().toISOString(),
          },
          ...(state.comments[cardId] || []),
        ],
      },
    })),

  addChecklistItem: (cardId, text) =>
    set((state) => ({
      checklists: {
        ...state.checklists,
        [cardId]: [
          ...(state.checklists[cardId] || []),
          {
            id: crypto.randomUUID(),
            text,
            completed: false,
            card_id: cardId,
            position: (state.checklists[cardId] || []).length,
          },
        ],
      },
    })),

  toggleChecklistItem: (cardId, itemId) =>
    set((state) => ({
      checklists: {
        ...state.checklists,
        [cardId]: (state.checklists[cardId] || []).map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        ),
      },
    })),

  removeChecklistItem: (cardId, itemId) =>
    set((state) => ({
      checklists: {
        ...state.checklists,
        [cardId]: (state.checklists[cardId] || []).filter((item) => item.id !== itemId),
      },
    })),
}));