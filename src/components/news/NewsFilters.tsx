
import { useState } from 'react';
import { BarChart3, TrendingDown, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NewsFilters = () => {
  const [importance, setImportance] = useState('HIGH');
  const [assetFilter, setAssetFilter] = useState('All assets');

  const importanceOptions = [
    { value: 'HIGH', label: 'HIGH', icon: BarChart3 },
    { value: 'MED', label: 'MED', icon: TrendingUp },
    { value: 'LOW', label: 'LOW', icon: TrendingDown }
  ];

  return (
    <div className="sticky top-16 z-10 bg-background border-b border-border pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {importanceOptions.map((option) => (
            <Button
              key={option.value}
              variant={importance === option.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setImportance(option.value)}
              className={`flex items-center space-x-2 ${
                importance === option.value 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <option.icon className="h-4 w-4" />
              <span>{option.label}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <span>{assetFilter}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
