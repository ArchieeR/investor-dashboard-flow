
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { AccountDropdown } from '@/components/account/AccountDropdown';
import { CalendarButton } from './CalendarButton';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const navigate = useNavigate();
  const [isResearchOpen, setIsResearchOpen] = useState(false);

  const handleTabClick = (tabName: string, path: string) => {
    onTabChange(tabName);
    navigate(path);
  };

  const handleCalendarClick = () => {
    onTabChange('Events');
    navigate('/events');
  };

  const handleResearchToolClick = (toolName: string, path: string) => {
    onTabChange(toolName);
    navigate(path);
    setIsResearchOpen(false);
  };

  const researchTools = [
    { name: 'News', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Screener', path: '/screener' },
    { name: 'Company Filings', path: '/company-filings' },
    { name: 'Broker Comparison', path: '/broker-comparer' },
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

              <DropdownMenu open={isResearchOpen} onOpenChange={setIsResearchOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={activeTab.includes('Research') || ['News', 'Events', 'Screener', 'Company Filings', 'Broker Comparison'].includes(activeTab) ? "default" : "ghost"}
                    className="text-sm flex items-center gap-1"
                  >
                    Research Tools
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-48 z-[200] bg-popover border-border shadow-lg"
                  sideOffset={4}
                >
                  {researchTools.map((tool) => (
                    <DropdownMenuItem
                      key={tool.name}
                      className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                      onClick={() => handleResearchToolClick(tool.name, tool.path)}
                    >
                      {tool.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

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
