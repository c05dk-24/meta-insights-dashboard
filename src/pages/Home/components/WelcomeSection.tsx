import React from 'react';
import { format } from 'date-fns';
import { Sun, Moon, Cloud } from 'lucide-react';

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

  const getWeatherIcon = () => {
    if (hour >= 6 && hour < 18) return Sun;
    return Moon;
  };

  const WeatherIcon = getWeatherIcon();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-8 text-white">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />

      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-blue-100 flex items-center gap-2">
            <WeatherIcon className="w-4 h-4" />
            {format(currentTime, 'EEEE, MMMM do, yyyy')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3">
            <p className="text-sm text-blue-100">Local Time</p>
            <p className="text-2xl font-semibold">
              {format(currentTime, 'h:mm a')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};