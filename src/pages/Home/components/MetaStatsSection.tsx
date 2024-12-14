import React from 'react';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { useMeta } from '../../../hooks/useMeta';
import { formatNumber, formatCurrency } from '../../../utils/metrics';

export const MetaStatsSection = () => {
  const { useInsights } = useMeta();
  const { data: insights, isLoading } = useInsights('thisWeek');

  const stats = [
    {
      label: 'Impressions',
      value: insights ? formatNumber(insights.impressions) : '0',
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'Leads',
      value: insights ? formatNumber(insights.leads) : '0',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Cost per Lead',
      value: insights ? formatCurrency(insights.costPerLead) : '£0',
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      label: 'Amount Spent',
      value: insights ? formatCurrency(insights.amountSpent) : '£0',
      icon: DollarSign,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">This Week's Performance</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</span>
            </div>
            <p className="text-2xl font-semibold dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};