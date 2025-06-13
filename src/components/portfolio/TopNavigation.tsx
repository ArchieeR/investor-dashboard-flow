
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { AccountDropdown } from '@/components/account/AccountDropdown';
import { CalendarButton } from './CalendarButton';
import { Bell, Search, Settings, TrendingUp, TrendingDown } from 'lucide-react';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const totalValue = 48193;
  const dayChange = 1307;
  const dayChangePercent = 2.79;
  const isPositive = dayChange >= 0;

  const tabs = [
    { name: 'Portfolio', path: '/' },
    { name: 'News', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Screener', path: '/screener' },
    { name: 'Broker Comparer', path: '/broker-comparer' },
    { name: 'Community', path: '/community' },
    { name: 'Learn', path: '/learn' }
  ];

  const handleTabClick = (tab: any) => {
    onTabChange(tab.name);
    navigate(tab.path);
  };

  return (
    <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold text-primary">Portfolio</div>
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.name}
                  variant={activeTab === tab.name ? "default" : "ghost"}
                  className="text-sm"
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="font-semibold text-foreground">
                £{totalValue.toLocaleString()}
              </div>
              <div className={`flex items-center space-x-1 font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{isPositive ? '+' : ''}£{dayChange}</span>
                <span>({isPositive ? '+' : ''}{dayChangePercent}%)</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <SearchDropdown />
              <CalendarButton />
              <NotificationDropdown />
              <AccountDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
