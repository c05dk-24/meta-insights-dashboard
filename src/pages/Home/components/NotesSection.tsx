import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { NotesModal } from './NotesModal';

interface Note {
  id: string;
  text: string;
  tags: string[];
  color: string;
}

export const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const colors = ['bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-yellow-400'];

  const handleAddNote = ({ text, tags }: { text: string; tags: string[] }) => {
    const note: Note = {
      id: crypto.randomUUID(),
      text,
      tags,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setNotes([...notes, note]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Quick Notes</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.color} p-4 rounded-lg text-white relative group transform hover:scale-105 transition-transform`}
          >
            <p className="mb-2">{note.text}</p>
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {note.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddNote}
      />
    </div>
  );
};