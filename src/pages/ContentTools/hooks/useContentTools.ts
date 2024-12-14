import { useMemo } from 'react';
import { Repeat, MessageSquare, FileText, Bot } from 'lucide-react';
import { ContentTool } from '../types';

export const useContentTools = () => {
  const tools = useMemo<ContentTool[]>(() => [
    {
      id: 'remix',
      path: 'remix',
      title: 'Content Remix',
      description: 'Transform your blog posts into multiple content formats automatically.',
      icon: Repeat,
      status: 'available'
    },
    {
      id: 'brand-voice',
      path: 'brand-voice',
      title: 'Brand Voice',
      description: 'Maintain consistent brand messaging across all content.',
      icon: MessageSquare,
      status: 'coming-soon'
    },
    {
      id: 'case-study',
      path: 'case-study',
      title: 'Case Study Generator',
      description: 'Turn customer success stories into compelling case studies.',
      icon: FileText,
      status: 'coming-soon'
    },
    {
      id: 'agent',
      path: 'agent',
      title: 'Content Agent',
      description: 'AI-powered expert that understands your brand.',
      icon: Bot,
      status: 'coming-soon'
    }
  ], []);

  return { tools };
};