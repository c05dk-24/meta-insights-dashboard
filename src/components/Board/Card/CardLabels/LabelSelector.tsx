import React from 'react';
import { Label } from '../../../../types/meta';
import { labelStyles } from './styles';

interface Props {
  availableLabels: Label[];
  onSelect: (labelId: string) => void;
  onClose: () => void;
}

export const LabelSelector: React.FC<Props> = ({ availableLabels, onSelect, onClose }) => {
  return (
    <div className={labelStyles.selector.container}>
      <div className={labelStyles.selector.list}>
        {availableLabels.map((label) => (
          <div
            key={label.id}
            onClick={() => {
              onSelect(label.id);
              onClose();
            }}
            className={labelStyles.selector.item(label.color)}
          >
            {label.name}
          </div>
        ))}
      </div>
    </div>
  );
};