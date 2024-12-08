export const getDateRange = (range) => {
  const today = new Date();
  let startDate, endDate;

  switch (range) {
    case 'today':
      startDate = endDate = today.toISOString().split('T')[0];
      break;

    case 'thisWeek': {
      const curr = new Date();
      const first = curr.getDate() - curr.getDay();
      startDate = new Date(curr.setDate(first)).toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
    }

    case 'lastWeek': {
      const curr = new Date();
      const first = curr.getDate() - curr.getDay() - 7;
      const last = first + 6;
      startDate = new Date(curr.setDate(first)).toISOString().split('T')[0];
      endDate = new Date(curr.setDate(last)).toISOString().split('T')[0];
      break;
    }

    case 'thisMonth': {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
    }

    case 'lastMonth': {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      startDate = lastMonth.toISOString().split('T')[0];
      endDate = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];
      break;
    }

    default:
      dbLogger.error('Invalid date range:', range);
      return {};
  }

  return { startDate, endDate };
};