export const getDateRange = (range) => {
  const today = new Date();
  let startDate, endDate;

  switch (range) {
    case 'today':
      startDate = endDate = today.toISOString().split('T')[0];
      break;
      
    case 'thisWeek':
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      startDate = weekStart.toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
      
    case 'lastWeek':
      const lastWeekEnd = new Date(today);
      lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
      const lastWeekStart = new Date(lastWeekEnd);
      lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
      startDate = lastWeekStart.toISOString().split('T')[0];
      endDate = lastWeekEnd.toISOString().split('T')[0];
      break;
      
    case 'thisMonth':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
      
    case 'thisYear':
      startDate = new Date(today.getFullYear(), 0, 1)
        .toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
      
    default:
      startDate = new Date(today.getFullYear(), 0, 1)
        .toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
  }

  return { startDate, endDate };
};