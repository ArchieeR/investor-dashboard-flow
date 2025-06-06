
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { NotificationWidget } from '@/components/portfolio/NotificationWidget';
import { PortfolioTable } from '@/components/portfolio/PortfolioTable';
import { AnalyticsWidgets } from '@/components/portfolio/AnalyticsWidgets';
import { AssetDetailPage } from '@/components/portfolio/AssetDetailPage';
import { NewsPage } from '@/components/portfolio/NewsPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('Portfolio');

  const renderContent = () => {
    switch (activeTab) {
      case 'News':
        return <NewsPage />;
      case 'Assets':
        return <AssetDetailPage />;
      case 'Community':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Community</h2>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
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
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Index;
