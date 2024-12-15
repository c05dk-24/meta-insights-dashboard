import React, { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';

interface Note {
  id: string;
  text: string;
  tags: string[];
  color: string;
}

export const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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

  const handleEditNote = ({ text, tags }: { text: string; tags: string[] }) => {
    if (selectedNote) {
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { ...note, text, tags }
          : note
      ));
      setSelectedNote(null);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Quick Notes</h2>
        <button
          onClick={() => {
            setSelectedNote(null);
            setIsModalOpen(true);
          }}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => handleNoteClick(note)}
            className={`${note.color} p-4 rounded-lg text-white relative group transform hover:scale-105 transition-transform cursor-pointer`}
          >
            <p className="mb-2">{note.text}</p>
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {note.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        title={selectedNote ? "Edit Note" : "Add New Note"}
      >
        <NoteForm
          initialData={selectedNote}
          onSubmit={selectedNote ? handleEditNote : handleAddNote}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedNote(null);
          }}
        />
      </Modal>
    </div>
  );
};

interface NoteFormProps {
  initialData?: Note | null;
  onSubmit: (data: { text: string; tags: string[] }) => void;
  onClose: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [text, setText] = useState(initialData?.text || '');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit({ text: text.trim(), tags });
      onClose();
    }
  };

  const addTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Note Content
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border dark:border-gray-600 rounded-lg resize-none h-32 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your note..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
            >
              <Tag className="w-3 h-3" />
              {t}
              <button 
                type="button" 
                onClick={() => setTags(tags.filter(tag => tag !== t))}
                className="ml-1 hover:text-blue-600 dark:hover:text-blue-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
            className="flex-1 px-3 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Add a tag..."
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Tag
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {initialData ? 'Update Note' : 'Save Note'}
        </button>
      </div>
    </form>
  );
};