
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { GridSystem, GridItem } from '@/components/dashboard/GridSystem';
import { FixedTopSection } from '@/components/dashboard/FixedTopSection';
import { AllocationPieChart } from '@/components/widgets/AllocationPieChart';
import { CountryExposure } from '@/components/widgets/CountryExposure';
import { EarningsCalendar } from '@/components/widgets/EarningsCalendar';
import { NotesWidget } from '@/components/portfolio/NotesWidget';
import { DividendTracker } from '@/components/portfolio/DividendTracker';
import { CurrencyWidget } from '@/components/portfolio/CurrencyWidget';
import { WatchlistWidget } from '@/components/portfolio/WatchlistWidget';

const Index = () => {
  const [activeTab, setActiveTab] = useState('Portfolio');

  // Only the draggable widgets below the fixed section
  const [gridItems, setGridItems] = useState<GridItem[]>([
    // Row 1 - 4 widgets, 2x2 each
    {
      id: 'allocation-pie',
      x: 0,
      y: 0,
      width: 2,
      height: 2,
      component: AllocationPieChart,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'country-exposure',
      x: 2,
      y: 0,
      width: 2,
      height: 2,
      component: CountryExposure,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'earnings',
      x: 4,
      y: 0,
      width: 2,
      height: 2,
      component: EarningsCalendar,
      minWidth: 2,
      minHeight: 2
    },
    {
      id: 'watchlist',
      x: 6,
      y: 0,
      width: 2,
      height: 2,
      component: WatchlistWidget,
      minWidth: 2,
      minHeight: 2
    },
    
    // Row 2 - Smaller widgets, 1x1 each
    {
      id: 'notes',
      x: 0,
      y: 2,
      width: 2,
      height: 1,
      component: NotesWidget,
      minWidth: 1,
      minHeight: 1
    },
    {
      id: 'dividends',
      x: 2,
      y: 2,
      width: 2,
      height: 1,
      component: DividendTracker,
      minWidth: 1,
      minHeight: 1
    },
    {
      id: 'currency',
      x: 4,
      y: 2,
      width: 2,
      height: 1,
      component: CurrencyWidget,
      minWidth: 1,
      minHeight: 1
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Fixed Top Section - Not draggable */}
        <FixedTopSection />
        
        {/* Draggable Grid Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
            Customizable Widgets
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
