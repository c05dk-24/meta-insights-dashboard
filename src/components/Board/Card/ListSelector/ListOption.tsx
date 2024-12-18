import React from 'react';
import { ListOptionProps } from './types';

export const ListOption: React.FC<ListOptionProps> = ({ list, isCurrentList }) => {
  return (
    <option 
      value={list.id}
      className={`py-2 ${isCurrentList ? 'font-medium' : ''}`}
    >
      {list.title} {isCurrentList ? '(Current)' : ''}
    </option>
  );
};