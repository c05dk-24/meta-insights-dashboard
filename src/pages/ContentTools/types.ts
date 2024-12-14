export interface RemixOutput {
  socialPosts: string[];
  emailNewsletter: string;
  twitterThread: string[];
  linkedInArticle: string;
}

export interface ContentTool {
  id: string;
  path: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'available' | 'coming-soon';
}