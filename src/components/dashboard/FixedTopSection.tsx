
import { Card } from '@/components/ui/card';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { AnalyticsWidgets } from '@/components/portfolio/AnalyticsWidgets';
import { NewsFeedWidget } from '@/components/widgets/NewsFeedWidget';
import { EnhancedPortfolioTable } from '@/components/portfolio/EnhancedPortfolioTable';

export const FixedTopSection = () => {
  const cellSize = 120;

  return (
    <div className="space-y-4 mb-6">
      {/* Top Row: Portfolio Chart + Analytics & News */}
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
        
        {/* Right side container - 4x4 total */}
        <div 
          className="space-y-2"
          style={{ 
            width: `${4 * cellSize}px`, 
            height: `${4 * cellSize}px` 
          }}
        >
          {/* Analytics Widgets - 4x2 */}
          <Card style={{ height: `${2 * cellSize - 8}px` }}>
            <AnalyticsWidgets />
          </Card>
          
          {/* Market News - 4x2 */}
          <Card style={{ height: `${2 * cellSize - 8}px` }}>
            <NewsFeedWidget />
          </Card>
        </div>
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
