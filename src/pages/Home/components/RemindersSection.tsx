import React, { useState } from 'react';
import { Bell, Calendar, Plus, X } from 'lucide-react';
import { format } from 'date-fns';

interface Reminder {
  id: string;
  text: string;
  date: string;
}

export const RemindersSection = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState('');
  const [newDate, setNewDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([
        ...reminders,
        {
          id: crypto.randomUUID(),
          text: newReminder.trim(),
          date: newDate
        }
      ]);
      setNewReminder('');
    }
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-semibold dark:text-white">Reminders</h2>
        </div>
        <button
          onClick={addReminder}
          disabled={!newReminder.trim()}
          className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Add a new reminder..."
            className="flex-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && addReminder()}
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 dark:text-white"
          />
        </div>

        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl"
          >
            <div>
              <p className="text-gray-800 dark:text-gray-200">{reminder.text}</p>
              <div className="flex items-center gap-1 mt-1 text-sm text-purple-600 dark:text-purple-400">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(reminder.date), 'MMM d, yyyy')}</span>
              </div>
            </div>
            <button
              onClick={() => removeReminder(reminder.id)}
              className="p-1 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg"
            >
              <X className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};