import React from 'react';
import { NoteInput } from './NoteInput';
import { NotesList } from './NotesList';
import { useNotes } from '../../hooks/useNotes';

export const NotesPanel = () => {
  const { notes, addNote, deleteNote } = useNotes();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 backdrop-blur-lg bg-opacity-90">
      <h2 className="text-2xl font-bold mb-6">Quick Notes</h2>
      <NoteInput onAdd={addNote} />
      <NotesList notes={notes} onDelete={deleteNote} />
    </div>
  );
};