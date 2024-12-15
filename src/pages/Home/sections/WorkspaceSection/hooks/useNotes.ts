import { useState } from 'react';
import { Note } from '../types';

const COLORS = ['bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-yellow-400'];

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (text: string) => {
    if (text.trim()) {
      const note: Note = {
        id: crypto.randomUUID(),
        text: text.trim(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
      setNotes([...notes, note]);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return { notes, addNote, deleteNote };
};