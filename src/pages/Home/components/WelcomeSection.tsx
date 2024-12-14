import React from 'react';
import { format } from 'date-fns';

interface Props {
  userName: string;
}

export const WelcomeSection = ({ userName }: Props) => {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  
  const getGreeting = () => {
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-blue-100">
            {format(currentTime, 'EEEE, MMMM do, yyyy')}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3">
          <p className="text-sm text-blue-100">Current Time</p>
          <p className="text-2xl font-semibold">
            {format(currentTime, 'h:mm a')}
          </p>
        </div>
      </div>
    </div>
  );
};