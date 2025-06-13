
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

  // Complete widget grid with all widgets properly integrated - all default to 2x2
  const [gridItems, setGridItems] = useState<GridItem[]>([
    // Row 1 - 4 visualization widgets, 2x2 each
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
    
    // Row 2 - 4 utility widgets, 2x2 each  
    {
      id: 'notes',
      x: 0,
      y: 2,
      width: 2,
      height: 2,
      component: NotesWidget,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'dividends',
      x: 2,
      y: 2,
      width: 2,
      height: 2,
      component: DividendTracker,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'currency',
      x: 4,
      y: 2,
      width: 2,
      height: 2,
      component: CurrencyWidget,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'watchlist',
      x: 6,
      y: 2,
      width: 2,
      height: 2,
      component: WatchlistWidget,
      minWidth: 2,
      minHeight: 2
    },

    // Row 3 - Additional widgets, 2x2 each
    {
      id: 'earnings-calendar',
      x: 0,
      y: 4,
      width: 2,
      height: 2,
      component: EarningsCalendar,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'country-exposure',
      x: 2,
      y: 4,
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
      
      {/* Full width container with padding only on the outer edges */}
      <div className="px-6 py-6">
        {/* Fixed Top Section - Portfolio Chart, Notification Widget, and Holdings Table */}
        <div className="max-w-none mx-auto">
          <FixedTopSection />
        </div>
        
        {/* Widget Grid Section - Full page width */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-6 text-muted-foreground">
            Portfolio Widgets
          </h3>
          {/* Full width grid with no container restrictions */}
          <div className="w-full">
            <GridSystem 
              items={gridItems} 
              onItemsChange={setGridItems}
              columns={8}
              cellSize={120}
              allowOverlap={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
