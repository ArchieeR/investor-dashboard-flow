
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { AccountDropdown } from '@/components/account/AccountDropdown';
import { CalendarButton } from './CalendarButton';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const navigate = useNavigate();

  const handleTabClick = (tabName: string, path: string) => {
    onTabChange(tabName);
    navigate(path);
  };

  const handleCalendarClick = () => {
    onTabChange('Events');
    navigate('/events');
  };

  const researchTools = [
    { name: 'News', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Screener', path: '/screener' },
    { name: 'Broker Comparer', path: '/broker-comparer' },
  ];

  return (
    <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold text-primary">Portfolio</div>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <Button
                variant={activeTab === 'Portfolio' ? "default" : "ghost"}
                className="text-sm"
                onClick={() => handleTabClick('Portfolio', '/')}
              >
                Portfolio
              </Button>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`text-sm ${activeTab.includes('Research') ? 'bg-accent' : ''}`}
                    >
                      Research Tools
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2">
                        {researchTools.map((tool) => (
                          <Button
                            key={tool.name}
                            variant="ghost"
                            className="w-full justify-start text-sm mb-1"
                            onClick={() => handleTabClick(tool.name, tool.path)}
                          >
                            {tool.name}
                          </Button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Button
                variant={activeTab === 'Community' ? "default" : "ghost"}
                className="text-sm"
                onClick={() => handleTabClick('Community', '/community')}
              >
                Community
              </Button>

              <Button
                variant={activeTab === 'Learn' ? "default" : "ghost"}
                className="text-sm"
                onClick={() => handleTabClick('Learn', '/learn')}
              >
                Learn
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <SearchDropdown />
            <div onClick={handleCalendarClick} className="cursor-pointer">
              <CalendarButton />
            </div>
            <NotificationDropdown />
            <AccountDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};
