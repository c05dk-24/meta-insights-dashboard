import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    items: [
      {
        id: 'm1',
        title: 'Social Media Marketing Fundamentals',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
        duration: '45 min',
        category: 'marketing'
      },
      // Add more marketing items...
    ]
  },
  {
    id: 'websites',
    title: 'Websites',
    items: [
      {
        id: 'w1',
        title: 'Web Design Principles',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
        duration: '30 min',
        category: 'websites'
      },
      // Add more website items...
    ]
  },
  // Add more categories...
];