import { DateRange } from '../types/meta';

export const DATE_RANGES = {
  TODAY: 'today',
  THIS_WEEK: 'thisWeek',
  LAST_WEEK: 'lastWeek',
  THIS_MONTH: 'thisMonth',
  THIS_YEAR: 'thisYear'
} as const;

export const getDateRange = (range: string): DateRange => {
  const today = new Date();
  
  const ranges: Record<string, () => DateRange> = {
    [DATE_RANGES.TODAY]: () => ({
      startDate: today.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    }),
    
    [DATE_RANGES.THIS_WEEK]: () => {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      return {
        startDate: weekStart.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0]
      };
    },
    
    [DATE_RANGES.LAST_WEEK]: () => {
      const lastWeekEnd = new Date(today);
      lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
      const lastWeekStart = new Date(lastWeekEnd);
      lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
      return {
        startDate: lastWeekStart.toISOString().split('T')[0],
        endDate: lastWeekEnd.toISOString().split('T')[0]
      };
    },
    
    [DATE_RANGES.THIS_MONTH]: () => ({
      startDate: new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    }),
    
    [DATE_RANGES.THIS_YEAR]: () => ({
      startDate: new Date(today.getFullYear(), 0, 1)
        .toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    })
  };

  const rangeFunction = ranges[range] || ranges[DATE_RANGES.THIS_MONTH];
  return rangeFunction();
};