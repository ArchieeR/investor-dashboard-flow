
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface AssetHeaderProps {
  asset: {
    name: string;
    ticker: string;
    exchange: string;
    type: string;
    category: string;
    price: number;
    currency: string;
    dayChange: number;
    dayChangePercent: number;
  };
}

export const AssetHeader = ({ asset }: AssetHeaderProps) => {
  const isPositive = asset.dayChange >= 0;
  
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {asset.name}
          </h1>
          <div className="flex items-center space-x-3 text-muted-foreground text-sm">
            <span>{asset.ticker}</span>
            <span>•</span>
            <span>{asset.exchange}</span>
            <span>•</span>
            <span>{asset.type}</span>
            <span>•</span>
            <span>{asset.category}</span>
          </div>
        </div>
        
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Fact Sheet</span>
        </Button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-4xl font-bold text-foreground">
          {asset.price.toFixed(2)} {asset.currency}
        </div>
        <div className={`flex items-center space-x-2 text-lg font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <span>{isPositive ? '+' : ''}{asset.dayChange.toFixed(2)}</span>
          <span>|</span>
          <span>{isPositive ? '+' : ''}{asset.dayChangePercent.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};
