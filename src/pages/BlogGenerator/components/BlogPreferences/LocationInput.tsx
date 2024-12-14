import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const LocationInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Target Location
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Global, United States, Europe"
        className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        required
      />
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Specify the geographical focus of your content
      </p>
    </div>
  );
};