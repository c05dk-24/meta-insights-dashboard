import React from 'react';
import { ArrowRight, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Transform Your Meta Marketing
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Powerful insights and AI-driven tools to optimize your Meta campaigns and drive better results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            View Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            to="/ai"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            Try AI Tools
            <Brain className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};