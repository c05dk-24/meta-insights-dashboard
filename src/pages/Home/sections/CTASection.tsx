import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 bg-blue-600 dark:bg-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Optimize Your Meta Campaigns?
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Join thousands of marketers who are already using our platform to improve their ROI.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-colors text-lg font-semibold"
        >
          Get Started Now
          <Rocket className="ml-2 w-6 h-6" />
        </Link>
      </div>
    </section>
  );
};