export const validateMetaPageId = (pageId?: string): string => {
  if (!pageId) {
    throw new Error('No Meta page ID provided');
  }
  
  // Remove 'act_' prefix if present
  const cleanPageId = pageId.replace(/^act_/, '');
  
  // Validate format (basic check)
  if (!/^\d+$/.test(cleanPageId)) {
    throw new Error('Invalid Meta page ID format');
  }
  
  return cleanPageId;
};