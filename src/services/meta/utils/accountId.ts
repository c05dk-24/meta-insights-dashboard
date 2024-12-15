/**
 * Formats account ID for Meta API requests by adding 'act_' prefix if not present
 */
export const formatAccountId = (id: string): string => {
  if (!id) return '';
  return id.startsWith('act_') ? id : `act_${id}`;
};

/**
 * Validates if the provided ID is a valid Meta account ID
 */
export const isValidAccountId = (id: string): boolean => {
  if (!id) return false;
  const cleanId = id.replace('act_', '');
  return /^\d+$/.test(cleanId);
};