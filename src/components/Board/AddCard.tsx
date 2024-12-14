import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';
import { BoardCard } from '../../types/meta';

interface Props {
  listId: string;
}

export const AddCard: React.FC<Props> = ({ listId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const addCard = useBoardStore(state => state.addCard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newCard: Omit<BoardCard, 'id' | 'comments'> = {
        title: title.trim(),
        description: '',
        labels: [],
        listId,
        position: 0 // Position will be calculated in the store
      };
      
      addCard(listId, newCard);
      setTitle('');
      setIsAdding(false);
    }
  };

  // Rest of the component remains the same
};