
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { name: 'Portfolio', path: '/' },
    { name: 'News', path: '/news' },
    { name: 'Asset', path: '/asset/VUSA' },
    { name: 'Community', path: '/community' }
  ];

  const handleTabClick = (tab: { name: string; path: string }) => {
    onTabChange(tab.name);
    navigate(tab.path);
  };

  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/App Name */}
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-bold text-foreground cursor-pointer" 
              onClick={() => navigate('/')}
            >
              WealthTracker
            </h1>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === tab.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ticker (e.g., VUSA)..."
              className="pl-10 bg-background border-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
