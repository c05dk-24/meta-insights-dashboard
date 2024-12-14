import { LucideIcon } from 'lucide-react';

export interface ContentTool {
  id: string;
  path: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'available' | 'coming-soon';
}