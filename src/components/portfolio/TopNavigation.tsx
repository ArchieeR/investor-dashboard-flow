
import { Home, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { AccountDropdown } from '@/components/account/AccountDropdown';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleResearchItemClick = (path: string, tabName: string) => {
    onTabChange(tabName);
    navigate(path);
  };

  return (
    <div className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-4">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer" 
              onClick={() => navigate('/')}
            >
              WT
            </h1>
            
            {/* Navigation Items */}
            <nav className="hidden md:flex items-center space-x-2">
              {/* Home Button */}
              <button
                onClick={() => {
                  onTabChange('Portfolio');
                  navigate('/');
                }}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === '/'
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </button>

              {/* Community Button */}
              <button
                onClick={() => {
                  onTabChange('Community');
                  navigate('/community');
                }}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === '/community'
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Users className="h-4 w-4 mr-2" />
                Community
              </button>

              {/* Research Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === '/news' || location.pathname.includes('/earnings') || location.pathname.includes('/events') || location.pathname.includes('/screener')
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    Research
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-popover border-border">
                  <DropdownMenuItem 
                    onClick={() => handleResearchItemClick('/news', 'News')}
                    className="cursor-pointer"
                  >
                    News
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleResearchItemClick('/events', 'Events')}
                    className="cursor-pointer"
                  >
                    Events
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleResearchItemClick('/screener', 'ETF Screener')}
                    className="cursor-pointer"
                  >
                    ETF Screener
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            
            {/* Search Bar */}
            <SearchDropdown />
          </div>

          {/* Right side - Notifications and Account */}
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <AccountDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};
