
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { NotificationWidget } from '@/components/portfolio/NotificationWidget';
import { EnhancedPortfolioTable } from '@/components/portfolio/EnhancedPortfolioTable';
import { AnalyticsWidgets } from '@/components/portfolio/AnalyticsWidgets';
import { NotesWidget } from '@/components/portfolio/NotesWidget';
import { DividendTracker } from '@/components/portfolio/DividendTracker';
import { CurrencyWidget } from '@/components/portfolio/CurrencyWidget';
import { WatchlistWidget } from '@/components/portfolio/WatchlistWidget';
import { GridSystem, GridItem } from '@/components/dashboard/GridSystem';
import { AllocationPieChart } from '@/components/widgets/AllocationPieChart';
import { CountryExposure } from '@/components/widgets/CountryExposure';
import { NewsFeedWidget } from '@/components/widgets/NewsFeedWidget';
import { EarningsCalendar } from '@/components/widgets/EarningsCalendar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('Portfolio');

  const [gridItems, setGridItems] = useState<GridItem[]>([
    // Fixed Holdings Table - spans full width
    {
      id: 'holdings-table',
      x: 0,
      y: 0,
      width: 8,
      height: 4,
      component: EnhancedPortfolioTable,
      fixed: true,
      minWidth: 8,
      minHeight: 4
    },
    // Portfolio Chart - large widget
    {
      id: 'portfolio-chart',
      x: 0,
      y: 4,
      width: 4,
      height: 3,
      component: PortfolioChart,
      minWidth: 4,
      minHeight: 2
    },
    // Analytics Widgets - spans full width
    {
      id: 'analytics',
      x: 0,
      y: 7,
      width: 8,
      height: 2,
      component: AnalyticsWidgets,
      minWidth: 8,
      minHeight: 2
    },
    // Notification Widget
    {
      id: 'notifications',
      x: 4,
      y: 4,
      width: 2,
      height: 3,
      component: NotificationWidget,
      minWidth: 1,
      minHeight: 2
    },
    // Allocation Pie Chart
    {
      id: 'allocation-pie',
      x: 6,
      y: 4,
      width: 2,
      height: 2,
      component: AllocationPieChart,
      minWidth: 2,
      minHeight: 2
    },
    // Country Exposure
    {
      id: 'country-exposure',
      x: 6,
      y: 6,
      width: 2,
      height: 3,
      component: CountryExposure,
      minWidth: 2,
      minHeight: 2
    },
    // News Feed
    {
      id: 'news-feed',
      x: 0,
      y: 9,
      width: 2,
      height: 3,
      component: NewsFeedWidget,
      minWidth: 2,
      minHeight: 3
    },
    // Earnings Calendar
    {
      id: 'earnings',
      x: 2,
      y: 9,
      width: 2,
      height: 3,
      component: EarningsCalendar,
      minWidth: 2,
      minHeight: 3
    },
    // Notes Widget
    {
      id: 'notes',
      x: 4,
      y: 9,
      width: 1,
      height: 2,
      component: NotesWidget,
      minWidth: 1,
      minHeight: 2
    },
    // Dividend Tracker
    {
      id: 'dividends',
      x: 5,
      y: 9,
      width: 1,
      height: 2,
      component: DividendTracker,
      minWidth: 1,
      minHeight: 2
    },
    // Currency Widget
    {
      id: 'currency',
      x: 6,
      y: 9,
      width: 1,
      height: 2,
      component: CurrencyWidget,
      minWidth: 1,
      minHeight: 2
    },
    // Watchlist Widget
    {
      id: 'watchlist',
      x: 7,
      y: 9,
      width: 1,
      height: 2,
      component: WatchlistWidget,
      minWidth: 1,
      minHeight: 2
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <GridSystem 
          items={gridItems} 
          onItemsChange={setGridItems}
          columns={8}
        />
      </div>
    </div>
  );
};

export default Index;
