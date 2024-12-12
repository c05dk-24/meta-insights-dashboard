export const extractLeads = (actions: any[] = []): number => {
  if (!Array.isArray(actions)) return 0;
  
  const leadAction = actions.find(action => 
    action.action_type === 'lead' || 
    action.action_type === 'leadgen' ||
    action.action_type === 'onsite_conversion.lead_grouped'
  );
  
  return parseInt(leadAction?.value || '0', 10);
};

export const calculateCostPerLead = (spend: string, actions: any[]): number => {
  const leads = extractLeads(actions);
  const spendAmount = parseFloat(spend || '0');
  return leads > 0 ? spendAmount / leads : 0;
};