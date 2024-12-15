import React from 'react';
import { ChecklistItem } from './ChecklistItem';
import { ChecklistInput } from './ChecklistInput';
import { useCardChecklist } from '../../../../hooks/useCardChecklist';

interface Props {
  cardId: string;
}

export const CardChecklist: React.FC<Props> = ({ cardId }) => {
  const { checklist, addItem, toggleItem, removeItem } = useCardChecklist(cardId);

  return (
    <div className="space-y-3">
      <ChecklistInput onAdd={addItem} />
      
      <div className="space-y-2">
        {checklist.map((item) => (
          <ChecklistItem
            key={item.id}
            id={item.id}
            text={item.text}
            completed={item.completed}
            onToggle={toggleItem}
            onDelete={removeItem}
          />
        ))}
      </div>
    </div>
  );
};