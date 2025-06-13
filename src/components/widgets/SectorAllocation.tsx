
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from 'lucide-react';

export const SectorAllocation = () => {
  console.log('SectorAllocation widget rendering');
  
  const sectors = [
    { name: 'Technology', percentage: 28.5, color: 'bg-blue-500' },
    { name: 'Healthcare', percentage: 15.2, color: 'bg-green-500' },
    { name: 'Financial Services', percentage: 12.8, color: 'bg-purple-500' },
    { name: 'Consumer Cyclical', percentage: 11.3, color: 'bg-yellow-500' },
    { name: 'Communication', percentage: 9.7, color: 'bg-red-500' },
    { name: 'Others', percentage: 22.5, color: 'bg-gray-500' },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-1">
          <PieChart className="h-3 w-3" />
          Sector Allocation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 overflow-hidden">
        {sectors.map((sector, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className={`w-2 h-2 rounded-full ${sector.color} flex-shrink-0`} />
                <span className="font-medium truncate">{sector.name}</span>
              </div>
              <span className="font-semibold flex-shrink-0">{sector.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div
                className={`${sector.color} h-1 rounded-full transition-all duration-300`}
                style={{ width: `${sector.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
