
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

const Index = () => {
  const [activeTab, setActiveTab] = useState('Portfolio');

  // The eight specified widgets in iPad-style grid
  const [gridItems, setGridItems] = useState<GridItem[]>([
    // Row 1 - 4 widgets, 2x2 each
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
    
    // Row 2 - 4 widgets, 2x1 each
    {
      id: 'notes',
      x: 0,
      y: 2,
      width: 2,
      height: 1,
      component: NotesWidget,
      minWidth: 2,
      minHeight: 1
    },
    {
      id: 'dividends',
      x: 2,
      y: 2,
      width: 2,
      height: 1,
      component: DividendTracker,
      minWidth: 2,
      minHeight: 1
    },
    {
      id: 'currency',
      x: 4,
      y: 2,
      width: 2,
      height: 1,
      component: CurrencyWidget,
      minWidth: 2,
      minHeight: 1
    },
    {
      id: 'watchlist',
      x: 6,
      y: 2,
      width: 2,
      height: 1,
      component: WatchlistWidget,
      minWidth: 2,
      minHeight: 1
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Fixed Top Section - Not draggable */}
        <FixedTopSection />
        
        {/* iPad-style Widget Grid Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
            Portfolio Widgets
          </h3>
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
  );
};

export default Index;
