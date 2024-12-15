import React from 'react';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileOverlay: React.FC<Props> = ({ isOpen, onClick }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
      onClick={onClick}
    />
  );
};