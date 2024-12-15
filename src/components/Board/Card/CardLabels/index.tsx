import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Label } from '../../../../types/meta';
import { LabelItem } from './LabelItem';
import { LabelSelector } from './LabelSelector';
import { labelStyles } from './styles';

interface Props {
  labels: Label[];
  availableLabels: Label[];
  onAddLabel: (labelId: string) => void;
  onRemoveLabel: (labelId: string) => void;
}

export const CardLabels: React.FC<Props> = ({
  labels,
  availableLabels,
  onAddLabel,
  onRemoveLabel
}) => {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className={labelStyles.container}>
      <div className={labelStyles.labelList}>
        {labels.map((label) => (
          <LabelItem
            key={label.id}
            label={label}
            onRemove={onRemoveLabel}
          />
        ))}
        <button
          onClick={() => setShowSelector(!showSelector)}
          className={labelStyles.addButton}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showSelector && (
        <LabelSelector
          availableLabels={availableLabels}
          onSelect={onAddLabel}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
};