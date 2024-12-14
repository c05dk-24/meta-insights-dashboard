import { 
  LayoutDashboard, 
  Trello, 
  Settings, 
  Wand2, 
  GraduationCap, 
  BookOpen,
  Sparkles 
} from 'lucide-react';

export const routes = [
  { 
    name: 'Dashboard', 
    path: '/', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Boards', 
    path: '/boards', 
    icon: Trello 
  },
  { 
    name: 'AI Post Generator', 
    path: '/ai', 
    icon: Wand2 
  },
  { 
    name: 'Blog Generator', 
    path: '/blog-generator', 
    icon: BookOpen 
  },
  { 
    name: 'Content Tools', 
    path: '/content-tools', 
    icon: Sparkles 
  },
  { 
    name: 'Education', 
    path: '/education', 
    icon: GraduationCap 
  },
  { 
    name: 'Settings', 
    path: '/settings', 
    icon: Settings 
  }
];