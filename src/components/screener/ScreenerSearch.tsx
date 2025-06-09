
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ScreenerSearchProps {
  selectedETFs: string[];
  onSelectionChange: (etfs: string[]) => void;
}

const mockETFs = [
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', region: 'US', theme: 'Large Cap' },
  { ticker: 'QQQ', name: 'Invesco QQQ Trust', region: 'US', theme: 'Technology' },
  { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', region: 'US', theme: 'Total Market' },
  { ticker: 'EQQQ', name: 'Invesco EQQQ NASDAQ-100 UCITS ETF', region: 'EU', theme: 'Technology' },
  { ticker: 'VWCE', name: 'Vanguard FTSE All-World UCITS ETF', region: 'EU', theme: 'World' },
  { ticker: 'AAPL', name: 'Apple Inc.', region: 'US', theme: 'Individual Stock' },
];

export const ScreenerSearch = ({ selectedETFs, onSelectionChange }: ScreenerSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredETFs = mockETFs.filter(etf =>
    etf.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etf.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etf.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (ticker: string) => {
    if (selectedETFs.length < 6 && !selectedETFs.includes(ticker)) {
      onSelectionChange([...selectedETFs, ticker]);
    }
    setSearchTerm('');
    setShowResults(false);
  };

  const handleRemove = (ticker: string) => {
    onSelectionChange(selectedETFs.filter(etf => etf !== ticker));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ETFs or stocks by ticker, name, region, or theme..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              onFocus={() => setShowResults(searchTerm.length > 0)}
              className="pl-10"
            />
            
            {showResults && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredETFs.map((etf) => (
                  <button
                    key={etf.ticker}
                    onClick={() => handleSelect(etf.ticker)}
                    disabled={selectedETFs.includes(etf.ticker) || selectedETFs.length >= 6}
                    className="w-full text-left px-4 py-3 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed border-b border-border last:border-0"
                  >
                    <div className="font-medium">{etf.ticker}</div>
                    <div className="text-sm text-muted-foreground">{etf.name}</div>
                    <div className="flex space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{etf.region}</Badge>
                      <Badge variant="outline" className="text-xs">{etf.theme}</Badge>
                    </div>
                  </button>
                ))}
                {filteredETFs.length === 0 && (
                  <div className="px-4 py-3 text-muted-foreground">No results found</div>
                )}
              </div>
            )}
          </div>

          {selectedETFs.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">Selected for comparison ({selectedETFs.length}/6):</div>
              <div className="flex flex-wrap gap-2">
                {selectedETFs.map((ticker) => (
                  <Badge key={ticker} variant="secondary" className="flex items-center gap-2">
                    {ticker}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(ticker)}
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
