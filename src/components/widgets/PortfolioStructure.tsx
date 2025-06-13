
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const PortfolioStructure = () => {
  const structure = [
    { category: 'Core Holdings', count: 8, percentage: 68.5, type: 'CORE' },
    { category: 'Satellite Holdings', count: 12, percentage: 24.3, type: 'SATELLITE' },
    { category: 'Alternatives', count: 4, percentage: 7.2, type: 'ALTS' },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      'CORE': 'bg-blue-100 text-blue-800',
      'SATELLITE': 'bg-green-100 text-green-800',
      'ALTS': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-1">
          <Building className="h-3 w-3" />
          Portfolio Structure
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-hidden">
        {structure.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Badge variant="secondary" className={`${getTypeColor(item.type)} text-xs flex-shrink-0`}>
                  {item.type}
                </Badge>
                <span className="text-xs font-medium truncate">{item.category}</span>
              </div>
              <span className="text-xs font-semibold flex-shrink-0">{item.percentage}%</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.count} holdings</span>
              <div className="w-16 bg-muted rounded-full h-1">
                <div
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
