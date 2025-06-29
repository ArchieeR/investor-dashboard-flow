
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { GridSystem, GridItem } from '@/components/dashboard/GridSystem';
import { FixedTopSection } from '@/components/dashboard/FixedTopSection';
import { SectorAllocation } from '@/components/widgets/SectorAllocation';
import { AssetAllocation } from '@/components/widgets/AssetAllocation';
import { PortfolioStructure } from '@/components/widgets/PortfolioStructure';
import { RegionExposure } from '@/components/widgets/RegionExposure';
import { NotesWidget } from '@/components/portfolio/NotesWidget';
import { DividendTracker } from '@/components/portfolio/DividendTracker';
import { CurrencyWidget } from '@/components/portfolio/CurrencyWidget';
import { WatchlistWidget } from '@/components/portfolio/WatchlistWidget';
import { EarningsCalendar } from '@/components/widgets/EarningsCalendar';
import { CountryExposure } from '@/components/widgets/CountryExposure';

const Index = () => {
  const [activeTab, setActiveTab] = useState('Portfolio');

  // Fixed 10-column grid with consistent 2x2 square widgets (5 per row, 2 rows)
  const [gridItems, setGridItems] = useState<GridItem[]>([
    // Top Row - 5 widgets across 10 columns (2x2 each for square appearance)
    {
      id: 'sector-allocation',
      x: 0,
      y: 0,
      width: 2,
      height: 2,
      component: SectorAllocation,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'asset-allocation',
      x: 2,
      y: 0,
      width: 2,
      height: 2,
      component: AssetAllocation,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'portfolio-structure',
      x: 4,
      y: 0,
      width: 2,
      height: 2,
      component: PortfolioStructure,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'region-exposure',
      x: 6,
      y: 0,
      width: 2,
      height: 2,
      component: RegionExposure,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'notes',
      x: 8,
      y: 0,
      width: 2,
      height: 2,
      component: NotesWidget,
      minWidth: 2,
      minHeight: 2
    },
    
    // Bottom Row - 5 widgets across 10 columns (2x2 each for square appearance)
    {
      id: 'dividends',
      x: 0,
      y: 2,
      width: 2,
      height: 2,
      component: DividendTracker,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'currency',
      x: 2,
      y: 2,
      width: 2,
      height: 2,
      component: CurrencyWidget,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'watchlist',
      x: 4,
      y: 2,
      width: 2,
      height: 2,
      component: WatchlistWidget,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'earnings-calendar',
      x: 6,
      y: 2,
      width: 2,
      height: 2,
      component: EarningsCalendar,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'country-exposure',
      x: 8,
      y: 2,
      width: 2,
      height: 2,
      component: CountryExposure,
      minWidth: 2,
      minHeight: 2
    }
  ]);

  console.log('Grid items:', gridItems);
  console.log('Grid items length:', gridItems.length);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Full width container with no padding constraints */}
      <div className="w-full py-6">
        {/* Fixed Top Section - Portfolio Chart, Notification Widget, and Holdings Table */}
        <div className="px-6">
          <FixedTopSection />
        </div>
        
        {/* Widget Grid Section - Full screen width, no padding constraints */}
        <div className="mt-8">
          <div className="px-6 mb-6">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Portfolio Widgets
            </h3>
          </div>
          {/* Grid container takes full screen width */}
          <div className="w-full px-6">
            <GridSystem 
              items={gridItems} 
              onItemsChange={setGridItems}
              columns={10}
              cellSize={140}
              allowOverlap={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
