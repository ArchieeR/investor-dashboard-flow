
import { useState } from 'react';
import { BarChart3, TrendingDown, TrendingUp, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const assetOptions = [
  'All assets',
  'SPY',
  'QQQ',
  'VTI', 
  'EQQQ',
  'VWCE',
  'AAPL',
  'SGLN',
  'IIND',
  'IJPN',
  'SEMA',
  'IEEM',
  'DFNG',
  'NATO',
  'NAVY',
  'NUCG',
  'NUCL'
];

interface NewsFiltersProps {
  onImportanceChange?: (importance: string[]) => void;
  onAssetChange?: (asset: string) => void;
  currentImportance?: string[];
  currentAsset?: string;
}

export const NewsFilters = ({ 
  onImportanceChange, 
  onAssetChange, 
  currentImportance = ['HIGH'],
  currentAsset = 'All assets'
}: NewsFiltersProps) => {
  const [selectedImportance, setSelectedImportance] = useState<string[]>(currentImportance);
  const [reputableSources, setReputableSources] = useState(true);
  const [otherSources, setOtherSources] = useState(true);

  const importanceOptions = [
    { 
      value: 'HIGH', 
      label: 'HIGH', 
      icon: BarChart3,
      activeClass: 'bg-green-500 text-white hover:bg-green-600',
      inactiveClass: 'bg-white text-green-700 hover:bg-green-50 border-green-300'
    },
    { 
      value: 'MED', 
      label: 'MED', 
      icon: TrendingUp,
      activeClass: 'bg-yellow-500 text-white hover:bg-yellow-600',
      inactiveClass: 'bg-white text-yellow-700 hover:bg-yellow-50 border-yellow-300'
    },
    { 
      value: 'LOW', 
      label: 'LOW', 
      icon: TrendingDown,
      activeClass: 'bg-red-500 text-white hover:bg-red-600',
      inactiveClass: 'bg-white text-red-700 hover:bg-red-50 border-red-300'
    }
  ];

  const toggleImportance = (importance: string) => {
    const newSelection = selectedImportance.includes(importance)
      ? selectedImportance.filter(item => item !== importance)
      : [...selectedImportance, importance];
    
    setSelectedImportance(newSelection);
    onImportanceChange?.(newSelection);
  };

  return (
    <div className="sticky top-16 z-30 bg-background border-b border-border pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {importanceOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              onClick={() => toggleImportance(option.value)}
              className={`flex items-center space-x-2 border ${
                selectedImportance.includes(option.value)
                  ? option.activeClass
                  : option.inactiveClass
              }`}
            >
              <option.icon className="h-4 w-4" />
              <span>{option.label}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2 border-sky-300 text-sky-700 hover:bg-sky-50 z-50">
                <Filter className="h-4 w-4" />
                <span>News Sources</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-3 z-50 bg-background">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="reputable" 
                      checked={reputableSources} 
                      onCheckedChange={(checked) => setReputableSources(checked === true)} 
                    />
                    <label htmlFor="reputable" className="text-sm font-medium">Reputable Sources</label>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    Institutional
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground ml-6">
                  Reuters, Bloomberg, FT, WSJ, The Economist
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="other" 
                      checked={otherSources} 
                      onCheckedChange={(checked) => setOtherSources(checked === true)} 
                    />
                    <label htmlFor="other" className="text-sm font-medium">Other Sources</label>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    Commentary
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground ml-6">
                  MarketWatch, CNBC, Yahoo Finance
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2 border-sky-300 text-sky-700 hover:bg-sky-50 z-50">
                <span>{currentAsset}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 max-h-60 overflow-y-auto z-50 bg-background">
              {assetOptions.map((asset) => (
                <DropdownMenuItem
                  key={asset}
                  onClick={() => onAssetChange?.(asset)}
                  className="cursor-pointer"
                >
                  {asset}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
