import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  color: string;
}

export const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const colors = ['bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-yellow-400'];

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: crypto.randomUUID(),
        text: newNote.trim(),
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 backdrop-blur-lg bg-opacity-90">
      <h2 className="text-2xl font-bold mb-6">Quick Notes</h2>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addNote}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.color} p-4 rounded-lg text-white relative group transform hover:scale-105 transition-transform`}
          >
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};