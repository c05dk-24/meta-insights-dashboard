import { DateRange } from '../types/meta';

export const DATE_RANGES = {
  TODAY: 'today',
  THIS_WEEK: 'thisWeek',
  LAST_WEEK: 'lastWeek',
  THIS_MONTH: 'thisMonth',
  LAST_30_DAYS: 'last30Days'
} as const;

export const getDateRange = (range: string): DateRange => {
  const today = new Date();
  let startDate: Date, endDate: Date;

  switch (range) {
    case DATE_RANGES.TODAY:
      startDate = endDate = today;
      break;

    case DATE_RANGES.THIS_WEEK:
      startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay());
      endDate = today;
      break;

    case DATE_RANGES.LAST_WEEK:
      endDate = new Date(today);
      endDate.setDate(today.getDate() - today.getDay() - 1);
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 6);
      break;

    case DATE_RANGES.THIS_MONTH:
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = today;
      break;

    case DATE_RANGES.LAST_30_DAYS:
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      endDate = today;
      break;

    default:
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      endDate = today;
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};