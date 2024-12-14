import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trello, 
  Settings, 
  Wand2, 
  GraduationCap, 
  BookOpen,
  Sparkles,
  X 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Boards', href: '/boards', icon: Trello },
  { name: 'AI Post Generator', href: '/ai', icon: Wand2 },
  { name: 'Blog Generator', href: '/blog-generator', icon: BookOpen },
  { name: 'Content Tools', href: '/content-tools', icon: Sparkles },
  { name: 'Education', href: '/education', icon: GraduationCap },
  { name: 'Settings', href: '/settings', icon: Settings },
];