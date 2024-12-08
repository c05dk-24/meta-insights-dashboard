import { subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';

export const getDateRange = (range) => {
  const today = new Date();
  let startDate, endDate;

  switch (range) {
    case 'today':
      startDate = endDate = format(today, 'yyyy-MM-dd');
      break;
      
    case 'thisWeek':
      startDate = format(startOfWeek(today), 'yyyy-MM-dd');
      endDate = format(today, 'yyyy-MM-dd');
      break;
      
    case 'lastWeek':
      const lastWeek = subDays(today, 7);
      startDate = format(startOfWeek(lastWeek), 'yyyy-MM-dd');
      endDate = format(endOfWeek(lastWeek), 'yyyy-MM-dd');
      break;
      
    case 'thisMonth':
      startDate = format(startOfMonth(today), 'yyyy-MM-dd');
      endDate = format(today, 'yyyy-MM-dd');
      break;
      
    default:
      return {};
  }

  return { startDate, endDate };
};

export const calculateChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};