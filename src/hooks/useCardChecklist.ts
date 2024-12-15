import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { apiClient } from '../services/api/config';
import { toast } from 'react-hot-toast';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  card_id: string;
  position: number;
}

export const useCardChecklist = (cardId: string) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  const addItem = async (text: string) => {
    try {
      const { data } = await apiClient.post(`/cards/${cardId}/checklist`, {
        text,
        position: checklist.length
      });
      setChecklist([...checklist, data]);
    } catch (error) {
      toast.error('Failed to add checklist item');
    }
  };

  const toggleItem = async (itemId: string) => {
    try {
      const item = checklist.find(i => i.id === itemId);
      if (!item) return;

      const { data } = await apiClient.put(`/cards/${cardId}/checklist/${itemId}`, {
        completed: !item.completed
      });

      setChecklist(checklist.map(i => 
        i.id === itemId ? { ...i, completed: !i.completed } : i
      ));
    } catch (error) {
      toast.error('Failed to update checklist item');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await apiClient.delete(`/cards/${cardId}/checklist/${itemId}`);
      setChecklist(checklist.filter(i => i.id !== itemId));
    } catch (error) {
      toast.error('Failed to remove checklist item');
    }
  };

  return {
    checklist,
    addItem,
    toggleItem,
    removeItem
  };
};