import React from 'react';
import { BlogPreferences } from './components/BlogPreferences';
import { BlogGenerator as Generator } from './components/BlogGenerator';
import { BlogHistory } from './components/BlogHistory';
import { useBlogStore } from '../../store/blogStore';

export const BlogGenerator = () => {
  const preferences = useBlogStore((state) => state.preferences);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 dark:text-white">
        Blog Content Generator
      </h1>
      
      {!preferences ? (
        <BlogPreferences />
      ) : (
        <div className="space-y-6 lg:space-y-8">
          <Generator />
          <BlogHistory />
        </div>
      )}
    </div>
  );
};