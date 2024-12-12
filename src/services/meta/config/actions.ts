// Meta Graph API action types
export const META_ACTION_TYPES = {
  LEAD: [
    'lead',
    'leadgen',
    'onsite_conversion.lead_grouped',
    'messaging_conversation_started_7d'
  ],
  ENGAGEMENT: [
    'post_engagement',
    'page_engagement',
    'post_reaction'
  ],
  CLICK: [
    'link_click',
    'outbound_click'
  ]
} as const;