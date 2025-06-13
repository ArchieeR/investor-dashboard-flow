
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
    // Fixed widgets at the top
    // Portfolio Chart - 4x8 at the very top
    {
      id: 'portfolio-chart',
      x: 0,
      y: 0,
      width: 4,
      height: 8,
      component: PortfolioChart,
      fixed: true,
      minWidth: 4,
      minHeight: 8
    },
    // Analytics Widgets - 4x8 next to chart
    {
      id: 'analytics',
      x: 4,
      y: 0,
      width: 4,
      height: 8,
      component: AnalyticsWidgets,
      fixed: true,
      minWidth: 4,
      minHeight: 8
    },
    // Holdings Table - 8x8 directly underneath
    {
      id: 'holdings-table',
      x: 0,
      y: 8,
      width: 8,
      height: 8,
      component: EnhancedPortfolioTable,
      fixed: true,
      minWidth: 8,
      minHeight: 8
    },
    
    // Moveable widgets below the fixed ones (starting from y: 16)
    // Allocation Pie Chart - 2x2
    {
      id: 'allocation-pie',
      x: 0,
      y: 16,
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
      y: 16,
      width: 2,
      height: 2,
      component: CountryExposure,
      minWidth: 2,
      minHeight: 2
    },
    // News Feed - 2x2
    {
      id: 'news-feed',
      x: 4,
      y: 16,
      width: 2,
      height: 2,
      component: NewsFeedWidget,
      minWidth: 2,
      minHeight: 2
    },
    // Earnings Calendar - 2x2
    {
      id: 'earnings',
      x: 6,
      y: 16,
      width: 2,
      height: 2,
      component: EarningsCalendar,
      minWidth: 2,
      minHeight: 2
    },
    // Notification Widget - 2x2
    {
      id: 'notifications',
      x: 0,
      y: 18,
      width: 2,
      height: 2,
      component: NotificationWidget,
      minWidth: 2,
      minHeight: 2
    },
    // Notes Widget - 2x2
    {
      id: 'notes',
      x: 2,
      y: 18,
      width: 2,
      height: 2,
      component: NotesWidget,
      minWidth: 2,
      minHeight: 2
    },
    // Dividend Tracker - 2x2
    {
      id: 'dividends',
      x: 4,
      y: 18,
      width: 2,
      height: 2,
      component: DividendTracker,
      minWidth: 2,
      minHeight: 2
    },
    // Currency Widget - 2x2
    {
      id: 'currency',
      x: 6,
      y: 18,
      width: 2,
      height: 2,
      component: CurrencyWidget,
      minWidth: 2,
      minHeight: 2
    },
    // Watchlist Widget - 2x2
    {
      id: 'watchlist',
      x: 0,
      y: 20,
      width: 2,
      height: 2,
      component: WatchlistWidget,
      minWidth: 2,
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
