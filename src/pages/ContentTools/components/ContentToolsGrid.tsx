import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentToolCard } from './ContentToolCard';
import { useContentTools } from '../hooks/useContentTools';

export const ContentToolsGrid = () => {
  const navigate = useNavigate();
  const { tools } = useContentTools();

  const handleToolClick = (path: string) => {
    navigate(`/content-tools/${path}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool) => (
        <ContentToolCard
          key={tool.id}
          tool={tool}
          onClick={() => handleToolClick(tool.path)}
        />
      ))}
    </div>
  );
};