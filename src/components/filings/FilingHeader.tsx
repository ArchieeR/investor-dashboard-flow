
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';

interface FilingHeaderProps {
  selectedTicker: string;
  onTickerChange: (ticker: string) => void;
  filingType: string;
  onFilingTypeChange: (type: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

const tickerSuggestions = [
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corporation' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.' },
  { ticker: 'TSLA', name: 'Tesla Inc.' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation' },
];

const filingTypes = ['Quarterly', 'Annual'];
const dateRanges = ['Last 4 quarters', '2 years', '3 years', '5 years', 'All time'];

export const FilingHeader = ({
  selectedTicker,
  onTickerChange,
  filingType,
  onFilingTypeChange,
  dateRange,
  onDateRangeChange
}: FilingHeaderProps) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Company / Ticker
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ticker or company name..."
              value={selectedTicker}
              onChange={(e) => onTickerChange(e.target.value)}
              className="pl-10 h-12 text-lg font-medium"
            />
            
            {/* Ticker suggestions dropdown */}
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {tickerSuggestions
                .filter(item => 
                  item.ticker.toLowerCase().includes(selectedTicker.toLowerCase()) ||
                  item.name.toLowerCase().includes(selectedTicker.toLowerCase())
                )
                .slice(0, 5)
                .map((item) => (
                <button
                  key={item.ticker}
                  onClick={() => onTickerChange(item.ticker)}
                  className="w-full text-left px-4 py-3 hover:bg-accent border-b border-border last:border-0"
                >
                  <div className="font-medium text-sm">{item.ticker}</div>
                  <div className="text-xs text-muted-foreground truncate">{item.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Filing Type
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 h-12 px-4">
                  {filingType}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {filingTypes.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => onFilingTypeChange(type)}
                    className="cursor-pointer"
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Date Range
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 h-12 px-4">
                  {dateRange}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {dateRanges.map((range) => (
                  <DropdownMenuItem
                    key={range}
                    onClick={() => onDateRangeChange(range)}
                    className="cursor-pointer"
                  >
                    {range}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  );
};
