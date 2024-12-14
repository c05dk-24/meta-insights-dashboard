export interface BlogPreferences {
  id: string;
  userId: string;
  keywords: string[];
  industry: string;
  location: string;
  tone: 'professional' | 'casual' | 'friendly' | 'technical';
  targetAudience: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedBlog {
  id: string;
  userId: string;
  title: string;
  content: string;
  keywords: string[];
  preferences: BlogPreferences;
  createdAt: string;
}