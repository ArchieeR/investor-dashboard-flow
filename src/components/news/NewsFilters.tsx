
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
  onImportanceChange?: (importance: string) => void;
  onAssetChange?: (asset: string) => void;
  currentImportance?: string;
  currentAsset?: string;
}

export const NewsFilters = ({ 
  onImportanceChange, 
  onAssetChange, 
  currentImportance = 'HIGH',
  currentAsset = 'All assets'
}: NewsFiltersProps) => {
  const [reputableSources, setReputableSources] = useState(true);
  const [otherSources, setOtherSources] = useState(true);
  const [socialMedia, setSocialMedia] = useState(false);

  const importanceOptions = [
    { 
      value: 'HIGH', 
      label: 'HIGH', 
      icon: BarChart3,
      activeClass: 'bg-green-500 text-white hover:bg-green-600',
      inactiveClass: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    { 
      value: 'MED', 
      label: 'MED', 
      icon: TrendingUp,
      activeClass: 'bg-yellow-500 text-white hover:bg-yellow-600',
      inactiveClass: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    },
    { 
      value: 'LOW', 
      label: 'LOW', 
      icon: TrendingDown,
      activeClass: 'bg-red-500 text-white hover:bg-red-600',
      inactiveClass: 'bg-red-100 text-red-700 hover:bg-red-200'
    }
  ];

  return (
    <div className="sticky top-16 z-30 bg-background border-b border-border pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {importanceOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              onClick={() => onImportanceChange?.(option.value)}
              className={`flex items-center space-x-2 border ${
                currentImportance === option.value 
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
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="reputable" 
                    checked={reputableSources} 
                    onCheckedChange={(checked) => setReputableSources(checked === true)} 
                  />
                  <label htmlFor="reputable" className="text-sm font-medium">Reputable Sources</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="other" 
                    checked={otherSources} 
                    onCheckedChange={(checked) => setOtherSources(checked === true)} 
                  />
                  <label htmlFor="other" className="text-sm font-medium">Other Sources</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="social" 
                    checked={socialMedia} 
                    onCheckedChange={(checked) => setSocialMedia(checked === true)} 
                  />
                  <label htmlFor="social" className="text-sm font-medium">Social Media</label>
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
