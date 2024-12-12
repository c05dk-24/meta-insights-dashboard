import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays } from 'date-fns';

export const getDateRange = (range) => {
  const today = new Date();
  let startDate, endDate;

  switch (range) {
    case 'today':
      startDate = today;
      endDate = today;
      break;

    case 'thisWeek':
      startDate = startOfWeek(today, { weekStartsOn: 1 });
      endDate = today;
      break;

    case 'lastWeek':
      endDate = subDays(startOfWeek(today, { weekStartsOn: 1 }), 1);
      startDate = subDays(endDate, 6);
      break;

    case 'thisMonth':
      startDate = startOfMonth(today);
      endDate = today;
      break;

    case 'last30Days':
      startDate = subDays(today, 30);
      endDate = today;
      break;

    case 'thisYear':
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = today;
      break;

    default:
      // Default to last 30 days if range is invalid
      startDate = subDays(today, 30);
      endDate = today;
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return false;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  return (
    start instanceof Date && 
    !isNaN(start) && 
    end instanceof Date && 
    !isNaN(end) && 
    start <= end
  );
};

export const DATE_RANGES = {
  TODAY: 'today',
  THIS_WEEK: 'thisWeek',
  LAST_WEEK: 'lastWeek',
  THIS_MONTH: 'thisMonth',
  LAST_30_DAYS: 'last30Days',
  THIS_YEAR: 'thisYear'
};