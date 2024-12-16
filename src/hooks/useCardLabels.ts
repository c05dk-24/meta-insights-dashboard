import { useState } from 'react';
import { Label } from '../types/meta';

const DEFAULT_LABELS: Label[] = [
  { id: '1', name: 'High Priority', color: 'bg-red-500' },
  { id: '2', name: 'Medium Priority', color: 'bg-yellow-500' },
  { id: '3', name: 'Low Priority', color: 'bg-green-500' },
  { id: '4', name: 'Bug', color: 'bg-purple-500' },
  { id: '5', name: 'Feature', color: 'bg-blue-500' },
];

export const useCardLabels = (cardId: string) => {
  const [labels, setLabels] = useState<Label[]>([]);

  const addLabel = (labelId: string) => {
    const label = DEFAULT_LABELS.find(l => l.id === labelId);
    if (label && !labels.find(l => l.id === labelId)) {
      setLabels([...labels, label]);
    }
  };

  const removeLabel = (labelId: string) => {
    setLabels(labels.filter(label => label.id !== labelId));
  };

  const availableLabels = DEFAULT_LABELS.filter(
    label => !labels.find(l => l.id === label.id)
  );

  return {
    labels,
    availableLabels,
    addLabel,
    removeLabel
  };
};