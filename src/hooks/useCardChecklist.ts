```typescript
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export const useCardChecklist = (cardId: string) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  const addItem = (text: string) => {
    setChecklist([
      ...checklist,
      {
        id: uuidv4(),
        text,
        completed: false
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
```