import React from 'react';
import { ContentRow } from './components/ContentRow';
import { categories } from './data/categories';

export const Education = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Learn & Grow</h1>
        
        {categories.map((category) => (
          <ContentRow
            key={category.id}
            title={category.title}
            items={category.items}
          />
        ))}
      </div>
    </div>
  );
};