
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { AssetHeader } from '@/components/asset/AssetHeader';
import { AssetOverview } from '@/components/asset/AssetOverview';
import { AssetPerformance } from '@/components/asset/AssetPerformance';
import { AssetHoldings } from '@/components/asset/AssetHoldings';
import { AssetSectorAllocation } from '@/components/asset/AssetSectorAllocation';
import { AssetCountryExposure } from '@/components/asset/AssetCountryExposure';
import { AssetNews } from '@/components/asset/AssetNews';

const AssetDetail = () => {
  const { ticker } = useParams();
  const [activeTab, setActiveTab] = useState('Portfolio');

  // Mock asset data - in a real app this would come from an API
  const assetData = {
    name: 'Vanguard S&P 500 UCITS ETF',
    ticker: 'VUSA',
    exchange: 'LON',
    type: 'Equity',
    category: 'Large Cap',
    price: 73.12,
    currency: 'USD',
    dayChange: 0.51,
    dayChangePercent: 0.70,
    objective: 'Track the performance of the S&P 500 Index',
    ter: '0,07%',
    indexTracked: 'S&P 500',
    domicile: 'Ireland'
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        <AssetHeader asset={assetData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Overview and Performance */}
          <div className="lg:col-span-2 space-y-6">
            <AssetOverview asset={assetData} />
            <AssetPerformance />
          </div>
          
          {/* Right column - Holdings, Sector Allocation, and Country Exposure */}
          <div className="space-y-6">
            <AssetHoldings />
            <AssetSectorAllocation />
            <AssetCountryExposure />
          </div>
        </div>
        
        <AssetNews ticker={ticker} />
      </div>
    </div>
  );
};

export default AssetDetail;
