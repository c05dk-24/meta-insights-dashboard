import { 
  Home,
  LayoutDashboard, 
  Trello, 
  Settings, 
  Wand2, 
  GraduationCap, 
  BookOpen,
  Sparkles 
} from 'lucide-react';

export const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Boards', href: '/boards', icon: Trello },
  { name: 'AI Post Generator', href: '/ai', icon: Wand2 },
  { name: 'Blog Generator', href: '/blog-generator', icon: BookOpen },
  { name: 'Content Tools', href: '/content-tools', icon: Sparkles },
  { name: 'Education', href: '/education', icon: GraduationCap },
  { name: 'Settings', href: '/settings', icon: Settings },
];