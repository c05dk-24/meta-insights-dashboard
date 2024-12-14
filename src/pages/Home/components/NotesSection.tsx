import React, { useState } from 'react';
import { StickyNote, Plus, X } from 'lucide-react';

export const NotesSection = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-semibold dark:text-white">Quick Notes</h2>
        </div>
        <button
          onClick={addNote}
          disabled={!newNote.trim()}
          className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/40 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className="w-full p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl focus:ring-2 focus:ring-yellow-500 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
          />
        </div>

        {notes.map((note, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl"
          >
            <p className="text-gray-800 dark:text-gray-200">{note}</p>
            <button
              onClick={() => removeNote(index)}
              className="p-1 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded-lg"
            >
              <X className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};