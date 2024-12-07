export interface UserPreferences {
  id: string;
  userId: string;
  industry: string;
  tone: 'professional' | 'casual' | 'friendly' | 'humorous';
  ageRange: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedContent {
  id: string;
  userId: string;
  prompt: string;
  content: string;
  preferences: UserPreferences;
  createdAt: string;
}

export const INDUSTRIES = [
  'Technology',
  'Fashion',
  'Food & Beverage',
  'Health & Wellness',
  'Travel',
  'Entertainment',
  'Education',
  'Finance',
  'Real Estate',
  'Sports',
] as const;

export const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'humorous', label: 'Humorous' },
] as const;

export const AGE_RANGES = [
  '13-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55+',
] as const;