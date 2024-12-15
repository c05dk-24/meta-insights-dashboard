import React from 'react';
import { ArrowRight, BarChart2, Brain, Rocket, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
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
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              View Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/ai"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Try AI Tools
              <Brain className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
};

const features = [
  {
    icon: BarChart2,
    title: 'Advanced Analytics',
    description: 'Get deep insights into your campaign performance with detailed analytics and custom reports.'
  },
  {
    icon: Brain,
    title: 'AI-Powered Tools',
    description: 'Leverage artificial intelligence to optimize your content and targeting strategies.'
  },
  {
    icon: Users,
    title: 'Audience Insights',
    description: 'Understand your audience better with detailed demographic and behavioral data.'
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Your data is protected with enterprise-grade security and compliance measures.'
  }
];

const stats = [
  {
    value: '10M+',
    label: 'Data Points Analyzed'
  },
  {
    value: '5000+',
    label: 'Active Users'
  },
  {
    value: '98%',
    label: 'Customer Satisfaction'
  },
  {
    value: '30%',
    label: 'Average ROI Increase'
  }
];