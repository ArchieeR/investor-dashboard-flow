
import { Search, Home, Bell, Calendar, User, Users, TrendingUp } from 'lucide-react';
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

  const handleToolsItemClick = (path: string, tabName: string) => {
    onTabChange(tabName);
    navigate(path);
  };

  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-bold text-foreground cursor-pointer" 
              onClick={() => navigate('/')}
            >
              WealthTracker
            </h1>
            
            {/* Navigation Items - Reorganized */}
            <nav className="hidden md:flex items-center space-x-6">
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

              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === '/news' || location.pathname.includes('/earnings') || location.pathname.includes('/events')
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Tools
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-popover border-border">
                  <DropdownMenuItem 
                    onClick={() => handleToolsItemClick('/news', 'News')}
                    className="cursor-pointer"
                  >
                    News
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleToolsItemClick('/earnings', 'Earnings')}
                    className="cursor-pointer"
                  >
                    Earnings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleToolsItemClick('/events', 'Events')}
                    className="cursor-pointer"
                  >
                    Events
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* Center - Search Bar */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ticker (e.g., VUSA)..."
              className="pl-10 bg-background border-input"
            />
          </div>

          {/* Right side - Account, Calendar, and Notification Icons */}
          <div className="flex items-center space-x-4">
            {/* Calendar Icon */}
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
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

            {/* Account Icon - Far Right */}
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
