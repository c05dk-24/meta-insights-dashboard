export interface ContentTool {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
  type: 'remix' | 'brand-voice' | 'case-study' | 'agent';
}

export interface RemixOutput {
  socialPosts: string[];
  emailNewsletter: string;
  twitterThread: string[];
  linkedInArticle: string;
}

export interface BrandVoiceAnalysis {
  tone: string;
  style: string;
  vocabulary: string[];
  recommendations: string[];
}

export interface CaseStudy {
  title: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial: string;
}

export interface ContentAgentTask {
  type: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  output?: string;
}