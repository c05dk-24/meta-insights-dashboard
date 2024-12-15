import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  LayoutDashboard, 
  Trello, 
  Settings, 
  Wand2, 
  GraduationCap, 
  BookOpen,
  Sparkles,
  X 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Boards', href: '/boards', icon: Trello },
  { name: 'AI Post Generator', href: '/ai', icon: Wand2 },
  { name: 'Blog Generator', href: '/blog-generator', icon: BookOpen },
  { name: 'Content Tools', href: '/content-tools', icon: Sparkles },
  { name: 'Education', href: '/education', icon: GraduationCap },
  { name: 'Settings', href: '/settings', icon: Settings },
];

// Rest of the component remains the same...