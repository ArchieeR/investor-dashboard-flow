
import { Search, Home, Bell, Calendar, User, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

  const handleCalendarClick = () => {
    onTabChange('Events');
    navigate('/events');
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
            
            {/* Navigation Items - Closer together */}
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
                    <Search className="h-4 w-4 mr-2" />
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
            
            {/* Search Bar - Smaller and to the left */}
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ticker..."
                className="pl-10 bg-background border-input"
              />
            </div>
          </div>

          {/* Right side - Account, Calendar, and Notification Icons */}
          <div className="flex items-center space-x-4">
            {/* Calendar Icon */}
            <button 
              onClick={handleCalendarClick}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              <Calendar className="h-5 w-5" />
            </button>

            {/* Notification Bell */}
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors relative">
              <Bell className="h-5 w-5" />
              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </div>
            </button>

            {/* Account Icon - Circular */}
            <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
