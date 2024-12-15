import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Optimize Your Meta Campaigns?
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Join thousands of marketers who are already using our platform to improve their ROI.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors text-lg font-semibold"
        >
          Get Started Now
          <Rocket className="ml-2 w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};