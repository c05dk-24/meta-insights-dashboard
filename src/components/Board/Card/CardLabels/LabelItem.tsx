import React from 'react';
import { Label } from '../../../../types/meta';
import { labelStyles } from './styles';

interface Props {
  label: Label;
  onRemove: (id: string) => void;
}

export const LabelItem: React.FC<Props> = ({ label, onRemove }) => {
  return (
    <span
      onClick={() => onRemove(label.id)}
      className={labelStyles.labelItem(label.color)}
    >
      {label.name}
    </span>
  );
};