
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
    // Holdings Table - large widget, minimum 4x3
    {
      id: 'holdings-table',
      x: 0,
      y: 0,
      width: 4,
      height: 3,
      component: EnhancedPortfolioTable,
      minWidth: 4,
      minHeight: 3
    },
    // Portfolio Chart - large widget, minimum 4x2
    {
      id: 'portfolio-chart',
      x: 4,
      y: 0,
      width: 4,
      height: 2,
      component: PortfolioChart,
      minWidth: 4,
      minHeight: 2
    },
    // Analytics Widgets - spans 4x2
    {
      id: 'analytics',
      x: 4,
      y: 2,
      width: 4,
      height: 1,
      component: AnalyticsWidgets,
      minWidth: 4,
      minHeight: 1
    },
    // Allocation Pie Chart - 2x2
    {
      id: 'allocation-pie',
      x: 0,
      y: 3,
      width: 2,
      height: 2,
      component: AllocationPieChart,
      minWidth: 2,
      minHeight: 2
    },
    // Country Exposure - 2x2
    {
      id: 'country-exposure',
      x: 2,
      y: 3,
      width: 2,
      height: 2,
      component: CountryExposure,
      minWidth: 1,
      minHeight: 1
    },
    // Notification Widget - 2x2
    {
      id: 'notifications',
      x: 4,
      y: 3,
      width: 2,
      height: 2,
      component: NotificationWidget,
      minWidth: 2,
      minHeight: 2
    },
    // News Feed - 2x2
    {
      id: 'news-feed',
      x: 6,
      y: 3,
      width: 2,
      height: 2,
      component: NewsFeedWidget,
      minWidth: 2,
      minHeight: 2
    },
    // Earnings Calendar - 2x2
    {
      id: 'earnings',
      x: 0,
      y: 5,
      width: 2,
      height: 2,
      component: EarningsCalendar,
      minWidth: 2,
      minHeight: 2
    },
    // Notes Widget - 1x1
    {
      id: 'notes',
      x: 2,
      y: 5,
      width: 1,
      height: 1,
      component: NotesWidget,
      minWidth: 1,
      minHeight: 1
    },
    // Dividend Tracker - 1x1
    {
      id: 'dividends',
      x: 3,
      y: 5,
      width: 1,
      height: 1,
      component: DividendTracker,
      minWidth: 1,
      minHeight: 1
    },
    // Currency Widget - 1x1
    {
      id: 'currency',
      x: 4,
      y: 5,
      width: 1,
      height: 1,
      component: CurrencyWidget,
      minWidth: 1,
      minHeight: 1
    },
    // Watchlist Widget - 1x1
    {
      id: 'watchlist',
      x: 5,
      y: 5,
      width: 1,
      height: 1,
      component: WatchlistWidget,
      minWidth: 1,
      minHeight: 1
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
