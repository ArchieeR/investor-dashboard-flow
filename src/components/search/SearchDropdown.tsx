
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const searchableETFs = [
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
];

export const SearchDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const filteredETFs = searchableETFs.filter(etf =>
    etf.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etf.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 6); // Limit to 6 results

  const handleSelect = (ticker: string) => {
    navigate(`/asset/${ticker}`);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="relative w-48">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search ticker..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowResults(e.target.value.length > 0);
        }}
        onFocus={() => setShowResults(searchTerm.length > 0)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        className="pl-10 bg-background border-input"
      />
      
      {showResults && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredETFs.map((etf) => (
            <button
              key={etf.ticker}
              onClick={() => handleSelect(etf.ticker)}
              className="w-full text-left px-4 py-3 hover:bg-accent border-b border-border last:border-0"
            >
              <div className="font-medium text-sm">{etf.ticker}</div>
              <div className="text-xs text-muted-foreground truncate">{etf.name}</div>
              <div className="flex space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">{etf.region}</Badge>
                <Badge variant="outline" className="text-xs">{etf.theme}</Badge>
              </div>
            </button>
          ))}
          {filteredETFs.length === 0 && searchTerm.length > 0 && (
            <div className="px-4 py-3 text-muted-foreground text-sm">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
