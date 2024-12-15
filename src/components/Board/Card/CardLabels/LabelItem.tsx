import React from 'react';
import { Label } from '../../../../types/meta';

interface Props {
  label: Label;
  onRemove: (id: string) => void;
}

export const LabelItem: React.FC<Props> = ({ label, onRemove }) => {
  return (
    <span
      onClick={() => onRemove(label.id)}
      className={`inline-flex items-center px-2 py-1 rounded text-white text-sm cursor-pointer ${label.color}`}
    >
      {label.name}
    </span>
  );
};