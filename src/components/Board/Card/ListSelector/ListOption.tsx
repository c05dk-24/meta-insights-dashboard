import React from 'react';

interface Props {
  list: {
    id: string;
    title: string;
  };
  isCurrentList: boolean;
}

export const ListOption: React.FC<Props> = ({ list, isCurrentList }) => {
  return (
    <option 
      value={list.id}
      className={`py-2 ${isCurrentList ? 'font-medium' : ''}`}
    >
      {list.title} {isCurrentList ? '(Current)' : ''}
    </option>
  );
};