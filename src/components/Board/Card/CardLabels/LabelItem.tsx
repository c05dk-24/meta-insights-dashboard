import React from 'react';
import { Label } from '../../../../types/meta';

interface Props {
  label: Label;
  onRemove: (id: string) => void;
}

export const LabelItem: React.FC<Props> = ({ label, onRemove }) => {
  const labelClasses = [
    'inline-flex',
    'items-center',
    'rounded',
    'text-white',
    'text-sm',
    'cursor-pointer',
    'p-2',
    label.color
  ].join(' ');

  return (
    <span
      onClick={() => onRemove(label.id)}
      className={labelClasses}
    >
      {label.name}
    </span>
  );
};