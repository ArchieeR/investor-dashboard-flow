
import { useState } from 'react';
import { Menu, Bell, Search, User, ChevronDown, Home, Wrench, Users, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { AccountDropdown } from '@/components/account/AccountDropdown';
import { useNavigate, useLocation } from 'react-router-dom';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const researchItems = [
    { name: 'News', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'ETF Screener', path: '/screener' },
    { name: 'Broker Comparer', path: '/broker-comparer' },
  ];

  const handleTabClick = (tab: string, path: string) => {
    onTabChange(tab);
    navigate(path);
  };

  const getCurrentTab = () => {
    if (location.pathname === '/') return 'Portfolio';
    if (location.pathname === '/community') return 'Community';
    if (location.pathname === '/learn') return 'Learn';
    const currentResearchItem = researchItems.find(item => item.path === location.pathname);
    return currentResearchItem ? 'Research' : activeTab;
  };

  const isResearchActive = () => {
    return researchItems.some(item => item.path === location.pathname);
  };

  return (
    <div className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-primary">WT</div>
            
            <nav className="hidden md:flex space-x-1">
              <button
                onClick={() => handleTabClick('Portfolio', '/')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-2 ${
                  getCurrentTab() === 'Portfolio'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Portfolio</span>
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 ${
                      isResearchActive()
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Wrench className="h-4 w-4" />
                    <span>Research</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {researchItems.map((item) => (
                    <DropdownMenuItem
                      key={item.name}
                      onClick={() => handleTabClick(item.name, item.path)}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => handleTabClick('Community', '/community')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-2 ${
                  getCurrentTab() === 'Community'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Community</span>
              </button>

              <button
                onClick={() => handleTabClick('Learn', '/learn')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-2 ${
                  getCurrentTab() === 'Learn'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Book className="h-4 w-4" />
                <span>Learn</span>
              </button>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchDropdown />
            </div>
            
            <NotificationDropdown />
            <AccountDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};
