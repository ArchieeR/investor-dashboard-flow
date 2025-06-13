
import { Card } from '@/components/ui/card';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { NewsFeedWidget } from '@/components/widgets/NewsFeedWidget';
import { EnhancedPortfolioTable } from '@/components/portfolio/EnhancedPortfolioTable';
import { NotificationWidget } from '@/components/portfolio/NotificationWidget';

export const FixedTopSection = () => {
  const cellSize = 120;

  console.log('FixedTopSection rendering - Portfolio Chart, News, and Holdings Table only');

  return (
    <div className="space-y-4 mb-6">
      {/* Top Row: Portfolio Chart + News + Notifications */}
      <div className="flex gap-4">
        {/* Portfolio Chart - 4x4 */}
        <Card 
          className="flex-1"
          style={{ 
            width: `${4 * cellSize}px`, 
            height: `${4 * cellSize}px` 
          }}
        >
          <PortfolioChart />
        </Card>
        
        {/* Market News - 4x4 */}
        <Card 
          style={{ 
            width: `${4 * cellSize}px`, 
            height: `${4 * cellSize}px` 
          }}
        >
          <NewsFeedWidget />
        </Card>

        {/* Notification Widget - 2x4 */}
        <Card 
          style={{ 
            width: `${2 * cellSize}px`, 
            height: `${4 * cellSize}px` 
          }}
        >
          <NotificationWidget />
        </Card>
      </div>
      
      {/* Holdings Table - Full width, 8x3 minimum */}
      <Card 
        style={{ 
          width: '100%', 
          minHeight: `${3 * cellSize}px` 
        }}
      >
        <EnhancedPortfolioTable />
      </Card>
    </div>
  );
};
