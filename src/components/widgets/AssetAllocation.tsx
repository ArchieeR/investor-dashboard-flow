
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

export const AssetAllocation = () => {
  const assets = [
    { name: 'Equities', percentage: 72.3, color: 'bg-blue-500' },
    { name: 'Bonds', percentage: 18.7, color: 'bg-green-500' },
    { name: 'Commodities', percentage: 6.2, color: 'bg-yellow-500' },
    { name: 'Cash', percentage: 2.8, color: 'bg-gray-500' },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-1">
          <Target className="h-3 w-3" />
          Asset Allocation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-hidden">
        {assets.map((asset, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className={`w-2 h-2 rounded-full ${asset.color} flex-shrink-0`} />
                <span className="font-medium truncate">{asset.name}</span>
              </div>
              <span className="font-semibold flex-shrink-0">{asset.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`${asset.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${asset.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
