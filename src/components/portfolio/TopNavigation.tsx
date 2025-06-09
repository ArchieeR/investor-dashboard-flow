
import { useState } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { AccountDropdown } from '@/components/account/AccountDropdown';
import { useNavigate, useLocation } from 'react-router-dom';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'Portfolio', path: '/' },
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
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    return currentTab ? currentTab.name : activeTab;
  };

  return (
    <div className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-primary">Portfolio</div>
            
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.name, tab.path)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    getCurrentTab() === tab.name
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchDropdown 
                isSearchFocused={isSearchFocused}
                setIsSearchFocused={setIsSearchFocused}
              />
            </div>
            
            <NotificationDropdown />
            <AccountDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};
