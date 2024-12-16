import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CardChecklist } from '../types/meta';

export const useCardChecklist = (cardId: string) => {
  const [checklist, setChecklist] = useState<CardChecklist[]>([]);

  const addItem = (text: string) => {
    setChecklist([
      ...checklist,
      {
        id: uuidv4(),
        text,
        completed: false,
        card_id: cardId,
        position: checklist.length
      }
    ]);
  };

  const toggleItem = (itemId: string) => {
    setChecklist(
      checklist.map(item =>
        item.id === itemId
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setChecklist(checklist.filter(item => item.id !== itemId));
  };

  return {
    checklist,
    addItem,
    toggleItem,
    removeItem
  };
};