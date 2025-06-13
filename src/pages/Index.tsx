
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { NotificationWidget } from '@/components/portfolio/NotificationWidget';
import { PortfolioTable } from '@/components/portfolio/PortfolioTable';
import { AnalyticsWidgets } from '@/components/portfolio/AnalyticsWidgets';
import { NotesWidget } from '@/components/portfolio/NotesWidget';
import { DividendTracker } from '@/components/portfolio/DividendTracker';
import { CurrencyWidget } from '@/components/portfolio/CurrencyWidget';
import { WatchlistWidget } from '@/components/portfolio/WatchlistWidget';

const Index = () => {
  const [activeTab, setActiveTab] = useState('Portfolio');

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Chart and Notification Widget Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <PortfolioChart />
          </div>
          <div className="lg:col-span-1">
            <NotificationWidget />
          </div>
        </div>

        {/* Portfolio Table */}
        <PortfolioTable />

        {/* Analytics Widgets */}
        <AnalyticsWidgets />

        {/* Bottom Widgets - All 1x1 in same row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NotesWidget />
          <DividendTracker />
          <CurrencyWidget />
          <WatchlistWidget />
        </div>
      </div>
    </div>
  );
};

export default Index;
