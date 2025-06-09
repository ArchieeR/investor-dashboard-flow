
import { useState } from 'react';
import { Search, X, TrendingUp, Check } from 'lucide-react';
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
  { ticker: 'SGLN', name: 'iShares Physical Gold ETC', region: 'EU', theme: 'Commodities' },
  { ticker: 'IIND', name: 'iShares MSCI India UCITS ETF', region: 'EU', theme: 'India' },
  { ticker: 'IJPN', name: 'iShares MSCI Japan UCITS ETF', region: 'EU', theme: 'Japan' },
  { ticker: 'IJXP', name: 'iShares Core FTSE 100 UCITS ETF', region: 'EU', theme: 'UK Large Cap' },
  { ticker: 'SEMA', name: 'iShares MSCI EM Asia UCITS ETF', region: 'EU', theme: 'Emerging Asia' },
  { ticker: 'IEEM', name: 'iShares MSCI Emerging Markets UCITS ETF', region: 'EU', theme: 'Emerging Markets' },
  { ticker: 'DFNG', name: 'VanEck Digital Assets Equity UCITS ETF', region: 'EU', theme: 'Digital Assets' },
  { ticker: 'NATO', name: 'North Atlantic Smaller Companies ETF', region: 'US', theme: 'Small Cap' },
  { ticker: 'NAVY', name: 'First Trust Naval ETF', region: 'US', theme: 'Defense' },
  { ticker: 'NUCG', name: 'Nuclear Energy Growth ETF', region: 'US', theme: 'Nuclear Energy' },
  { ticker: 'NUCL', name: 'Nuclear Innovation ETF', region: 'US', theme: 'Nuclear Innovation' },
  { ticker: 'TSLA', name: 'Tesla Inc.', region: 'US', theme: 'Individual Stock' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', region: 'US', theme: 'Individual Stock' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', region: 'US', theme: 'Individual Stock' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', region: 'US', theme: 'Individual Stock' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', region: 'US', theme: 'Individual Stock' },
  { ticker: 'META', name: 'Meta Platforms Inc.', region: 'US', theme: 'Individual Stock' },
];

const trendingAssets = [
  { ticker: 'NUCG', type: 'ETF', change: '+12.4%' },
  { ticker: 'NVDA', type: 'Stock', change: '+8.2%' },
  { ticker: 'DFNG', type: 'ETF', change: '+7.1%' },
  { ticker: 'TSLA', type: 'Stock', change: '+6.8%' },
  { ticker: 'QQQ', type: 'ETF', change: '+5.3%' },
  { ticker: 'AAPL', type: 'Stock', change: '+4.9%' },
  { ticker: 'MSFT', type: 'Stock', change: '+4.2%' },
  { ticker: 'SPY', type: 'ETF', change: '+3.7%' },
];

const indexes = [
  { name: 'S&P 500', value: '5,534.12', change: '+0.85%', positive: true },
  { name: 'NASDAQ', value: '17,862.23', change: '+1.24%', positive: true },
  { name: 'FTSE 100', value: '8,234.45', change: '+0.45%', positive: true },
  { name: 'FTSE 250', value: '20,567.89', change: '-0.23%', positive: false },
  { name: 'STOXX 600', value: '456.78', change: '+0.67%', positive: true },
  { name: 'NIKKEI 225', value: '38,567.12', change: '+1.12%', positive: true },
  { name: 'NIFTY 50', value: '24,234.56', change: '+0.89%', positive: true },
  { name: 'HANG SENG', value: '17,890.34', change: '-0.56%', positive: false },
  { name: 'SSE', value: '2,987.45', change: '+0.34%', positive: true },
];

export const ScreenerSearch = ({ selectedETFs, onSelectionChange }: ScreenerSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const handleConfirmSelections = () => {
    setShowSuggestions(false);
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
              onChange={handleSearchChange}
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

          {/* Trending Assets and Indexes - shown when not searching */}
          {searchTerm.length === 0 && showSuggestions && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Trending Assets</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleConfirmSelections}
                    className="flex items-center space-x-1"
                  >
                    <Check className="h-3 w-3" />
                    <span className="text-xs">Confirm</span>
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {trendingAssets.map((asset) => (
                    <button
                      key={asset.ticker}
                      onClick={() => handleSelect(asset.ticker)}
                      disabled={selectedETFs.includes(asset.ticker) || selectedETFs.length >= 6}
                      className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      <div className="font-medium text-xs">{asset.ticker}</div>
                      <div className="text-xs text-muted-foreground">{asset.type}</div>
                      <div className="text-xs text-green-600 font-medium">{asset.change}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-3">Market Indexes</div>
                <div className="grid grid-cols-3 gap-2">
                  {indexes.map((index) => (
                    <div
                      key={index.name}
                      className="p-2 border border-border rounded-lg bg-card"
                    >
                      <div className="font-medium text-xs">{index.name}</div>
                      <div className="text-xs text-muted-foreground">{index.value}</div>
                      <div className={`text-xs font-medium ${index.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {index.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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
