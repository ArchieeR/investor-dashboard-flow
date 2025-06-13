
import { Card } from '@/components/ui/card';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { EnhancedPortfolioTable } from '@/components/portfolio/EnhancedPortfolioTable';
import { NotificationWidget } from '@/components/portfolio/NotificationWidget';

export const FixedTopSection = () => {
  const cellSize = 120;

  console.log('FixedTopSection rendering - Portfolio Chart and Holdings with Notification Widget');

  return (
    <div className="space-y-4 mb-6">
      {/* Top Row: Portfolio Chart - Full width */}
      <Card 
        className="w-full"
        style={{ 
          height: `${4 * cellSize}px` 
        }}
      >
        <PortfolioChart />
      </Card>
      
      {/* Second Row: Holdings Table + Day/Total Gains + Market News */}
      <div className="flex gap-4">
        {/* Holdings Table - Takes majority of width */}
        <Card 
          className="flex-1"
          style={{ 
            minHeight: `${4 * cellSize}px` 
          }}
        >
          <EnhancedPortfolioTable />
        </Card>

        {/* Notification Widget - Fixed width on right */}
        <Card 
          className="flex-shrink-0"
          style={{ 
            width: `${3 * cellSize}px`, 
            height: `${4 * cellSize}px` 
          }}
        >
          <NotificationWidget />
        </Card>
      </div>
    </div>
  );
};
