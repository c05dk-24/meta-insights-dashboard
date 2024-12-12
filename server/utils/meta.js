import { User } from '../models/index.js';

export const getFormattedMetaAdId = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user || !user.meta_ad_id) {
    throw new Error("Meta Ad ID not found for user.");
  }
  return `act_${user.meta_ad_id.trim()}`;
};

export const getDateRange = (range) => {
  const today = new Date();
  let startDate, endDate;

  switch (range) {
    case "today":
      startDate = endDate = today.toISOString().split("T")[0];
      break;
    case "thisWeek":
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      startDate = weekStart.toISOString().split("T")[0];
      endDate = new Date().toISOString().split("T")[0];
      break;
    case "lastWeek":
      const lastWeekEnd = new Date(today.setDate(today.getDate() - today.getDay() - 1));
      const lastWeekStart = new Date(lastWeekEnd.setDate(lastWeekEnd.getDate() - 6));
      startDate = lastWeekStart.toISOString().split("T")[0];
      endDate = lastWeekEnd.toISOString().split("T")[0];
      break;
    case "thisMonth":
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      startDate = monthStart.toISOString().split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;
    default:
      return {};
  }

  return { startDate, endDate };
};

export const aggregateInsights = (data) => {
  const aggregated = data.reduce(
    (acc, item) => {
      acc.spend += parseFloat(item.spend || 0);
      acc.impressions += parseInt(item.impressions || 0, 10);
      acc.leads += parseInt(
        item.actions?.find((a) => a.action_type === "lead")?.value || 0,
        10
      );
      return acc;
    },
    { spend: 0, impressions: 0, leads: 0, costPerLead: 0 }
  );

  aggregated.costPerLead = aggregated.leads > 0 ? aggregated.spend / aggregated.leads : 0;
  return aggregated;
};