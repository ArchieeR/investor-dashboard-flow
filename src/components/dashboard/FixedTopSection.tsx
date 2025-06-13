
import { Card } from '@/components/ui/card';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { EnhancedPortfolioTable } from '@/components/portfolio/EnhancedPortfolioTable';
import { NotificationWidget } from '@/components/portfolio/NotificationWidget';

export const FixedTopSection = () => {
  const cellSize = 120;

  console.log('FixedTopSection rendering - 2-column layout with Portfolio Chart and Notification Widget');

  return (
    <div className="space-y-6 mb-8">
      {/* Top Row: 2-Column Layout - Chart (70-80%) + Notification Widget (20-30%) */}
      <div className="flex gap-6">
        {/* Left Side: Portfolio Chart - Takes majority of width */}
        <Card 
          className="flex-1"
          style={{ 
            minHeight: `${4 * cellSize}px`,
            flex: '0 0 75%' // Takes 75% of the width
          }}
        >
          <PortfolioChart />
        </Card>

        {/* Right Side: Notification Widget - Fixed smaller width */}
        <Card 
          className="flex-shrink-0"
          style={{ 
            width: `${3 * cellSize}px`, 
            height: `${4 * cellSize}px`,
            flex: '0 0 25%' // Takes 25% of the width
          }}
        >
          <NotificationWidget />
        </Card>
      </div>
      
      {/* Bottom Row: Holdings Table - Full width */}
      <Card 
        className="w-full"
        style={{ 
          minHeight: `${4 * cellSize}px` 
        }}
      >
        <EnhancedPortfolioTable />
      </Card>
    </div>
  );
};
