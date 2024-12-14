export type ToneType = 'professional' | 'casual' | 'friendly' | 'humorous';

export interface UserPreferences {
  id: string;
  userId: string;
  industry: string;
  tone: ToneType;
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
  { value: 'professional' as ToneType, label: 'Professional' },
  { value: 'casual' as ToneType, label: 'Casual' },
  { value: 'friendly' as ToneType, label: 'Friendly' },
  { value: 'humorous' as ToneType, label: 'Humorous' },
] as const;

export const AGE_RANGES = [
  '13-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55+',
] as const;