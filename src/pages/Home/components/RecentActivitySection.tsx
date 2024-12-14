import React from 'react';
import { Activity, MessageSquare, FileText } from 'lucide-react';
import { format } from 'date-fns';

export const RecentActivitySection = () => {
  // This would typically come from an API or store
  const activities = [
    {
      id: 1,
      type: 'post',
      title: 'Summer Collection Post Generated',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      id: 2,
      type: 'blog',
      title: 'Top 10 Summer Trends Blog Created',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      icon: FileText,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      id: 3,
      type: 'engagement',
      title: 'Campaign Performance Updated',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Recent Activity</h2>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${activity.bgColor}`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium dark:text-white">{activity.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(activity.timestamp, 'MMM d, h:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};