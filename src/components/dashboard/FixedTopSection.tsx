
import { Card } from '@/components/ui/card';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { EnhancedPortfolioTable } from '@/components/portfolio/EnhancedPortfolioTable';
import { NotificationWidget } from '@/components/portfolio/NotificationWidget';

export const FixedTopSection = () => {
  const cellSize = 120;
  const chartHeight = 4 * cellSize; // 480px

  console.log('FixedTopSection rendering - 2-column layout with Portfolio Chart and Notification Widget');

  return (
    <div className="space-y-6 mb-8">
      {/* Top Row: 2-Column Layout - Chart (75%) + Notification Widget (25%) */}
      <div className="flex gap-6 h-fit">
        {/* Left Side: Portfolio Chart - Takes majority of width */}
        <Card 
          className="flex-1 flex flex-col"
          style={{ 
            height: `${chartHeight}px`, // Fixed height to match notification widget
            flex: '0 0 75%' // Takes 75% of the width
          }}
        >
          <div className="flex-1 h-full">
            <PortfolioChart />
          </div>
        </Card>

        {/* Right Side: Notification Widget - Fixed smaller width, matching height */}
        <Card 
          className="flex-shrink-0 flex flex-col"
          style={{ 
            width: `${3 * cellSize}px`, 
            height: `${chartHeight}px`, // Matches chart height exactly
            flex: '0 0 25%' // Takes 25% of the width
          }}
        >
          <div className="flex-1 h-full">
            <NotificationWidget />
          </div>
        </Card>
      </div>
      
      {/* Bottom Row: Holdings Table - Full width, flexible height */}
      <Card className="w-full flex flex-col">
        <div className="flex-1">
          <EnhancedPortfolioTable />
        </div>
      </Card>
    </div>
  );
};
