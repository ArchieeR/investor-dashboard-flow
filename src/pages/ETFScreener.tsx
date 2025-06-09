
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { ScreenerSearch } from '@/components/screener/ScreenerSearch';
import { ComparisonTable } from '@/components/screener/ComparisonTable';
import { HoldingsMatrix } from '@/components/screener/HoldingsMatrix';
import { PerformanceChart } from '@/components/screener/PerformanceChart';

const ETFScreener = () => {
  const [activeTab, setActiveTab] = useState('ETF Screener');
  const [selectedETFs, setSelectedETFs] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">ETF Screener</h1>
          </div>
          
          <ScreenerSearch selectedETFs={selectedETFs} onSelectionChange={setSelectedETFs} />
          
          {selectedETFs.length > 0 && (
            <>
              <ComparisonTable selectedETFs={selectedETFs} />
              <PerformanceChart selectedETFs={selectedETFs} />
              <HoldingsMatrix selectedETFs={selectedETFs} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ETFScreener;
