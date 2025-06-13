
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const RegionExposure = () => {
  const regions = [
    { name: 'North America', percentage: 62.4, flag: '🇺🇸' },
    { name: 'Europe', percentage: 18.9, flag: '🇪🇺' },
    { name: 'Asia-Pacific', percentage: 14.2, flag: '🌏' },
    { name: 'Emerging Markets', percentage: 4.5, flag: '🌍' },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          Region Exposure
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 overflow-hidden">
        {regions.map((region, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <span className="text-sm flex-shrink-0">{region.flag}</span>
                <span className="font-medium truncate">{region.name}</span>
              </div>
              <span className="font-semibold flex-shrink-0">{region.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${region.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
