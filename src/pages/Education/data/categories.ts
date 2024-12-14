import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    items: [
      {
        id: 'm1',
        title: 'Social Media Marketing Fundamentals',
        description: 'Learn the basics of social media marketing and how to create an effective strategy.',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
        duration: '45 min',
        category: 'Marketing'
      },
      {
        id: 'm2',
        title: 'Content Marketing Strategy',
        description: 'Develop a content marketing strategy that drives results.',
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
        duration: '35 min',
        category: 'Marketing'
      },
      {
        id: 'm3',
        title: 'Email Marketing Mastery',
        description: 'Master email marketing campaigns and automation.',
        thumbnail: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f',
        duration: '40 min',
        category: 'Marketing'
      }
    ]
  },
  {
    id: 'websites',
    title: 'Websites',
    items: [
      {
        id: 'w1',
        title: 'Web Design Principles',
        description: 'Learn fundamental principles of effective web design.',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
        duration: '30 min',
        category: 'Websites'
      },
      {
        id: 'w2',
        title: 'Responsive Design',
        description: 'Create websites that work perfectly on all devices.',
        thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
        duration: '35 min',
        category: 'Websites'
      },
      {
        id: 'w3',
        title: 'Website Performance',
        description: 'Optimize your website for maximum speed and performance.',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        duration: '40 min',
        category: 'Websites'
      }
    ]
  },
  {
    id: 'seo',
    title: 'SEO',
    items: [
      {
        id: 's1',
        title: 'SEO Fundamentals',
        description: 'Learn the basics of search engine optimization.',
        thumbnail: 'https://images.unsplash.com/photo-1571721795195-a2b47e61c0ac',
        duration: '50 min',
        category: 'SEO'
      },
      {
        id: 's2',
        title: 'Keyword Research',
        description: 'Master the art of finding valuable keywords.',
        thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293',
        duration: '35 min',
        category: 'SEO'
      },
      {
        id: 's3',
        title: 'Technical SEO',
        description: 'Optimize your website\'s technical aspects for search engines.',
        thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
        duration: '45 min',
        category: 'SEO'
      }
    ]
  },
  {
    id: 'sales',
    title: 'Sales',
    items: [
      {
        id: 'sa1',
        title: 'Sales Fundamentals',
        description: 'Learn essential sales techniques and strategies.',
        thumbnail: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b',
        duration: '40 min',
        category: 'Sales'
      },
      {
        id: 'sa2',
        title: 'Closing Techniques',
        description: 'Master the art of closing deals effectively.',
        thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
        duration: '35 min',
        category: 'Sales'
      },
      {
        id: 'sa3',
        title: 'Negotiation Skills',
        description: 'Develop strong negotiation skills for better deals.',
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
        duration: '45 min',
        category: 'Sales'
      }
    ]
  },
  {
    id: 'social',
    title: 'Organization Social',
    items: [
      {
        id: 'so1',
        title: 'Social Media Strategy',
        description: 'Create an effective social media strategy for your organization.',
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        duration: '40 min',
        category: 'Social'
      },
      {
        id: 'so2',
        title: 'Content Creation',
        description: 'Learn to create engaging social media content.',
        thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
        duration: '35 min',
        category: 'Social'
      },
      {
        id: 'so3',
        title: 'Community Management',
        description: 'Master the art of managing online communities.',
        thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
        duration: '45 min',
        category: 'Social'
      }
    ]
  }
];