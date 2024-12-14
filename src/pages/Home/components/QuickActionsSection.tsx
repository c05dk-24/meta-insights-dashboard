import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, FileText, Bot, Trello, Settings } from 'lucide-react';

export const QuickActionsSection = () => {
  const navigate = useNavigate();

  const actions = [
    {
      name: 'Generate Post',
      description: 'Create AI-powered social media content',
      icon: Wand2,
      path: '/ai',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      name: 'New Blog',
      description: 'Write a blog post with AI assistance',
      icon: FileText,
      path: '/blog-generator',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      name: 'Content Agent',
      description: 'Get help from your AI assistant',
      icon: Bot,
      path: '/content-tools/agent',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      name: 'Boards',
      description: 'Manage your content boards',
      icon: Trello,
      path: '/boards',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Quick Actions</h2>
      
      <div className="space-y-4">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={() => navigate(action.path)}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className={`p-3 rounded-xl ${action.bgColor} group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <div className="text-left">
              <h3 className="font-medium dark:text-white">{action.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};