
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface HoldingsMatrixProps {
  selectedETFs: string[];
}

const mockHoldings = [
  { 
    name: 'Apple Inc.', 
    ticker: 'AAPL', 
    sector: 'Technology', 
    country: 'US',
    weights: { SPY: 7.1, QQQ: 11.8, VTI: 6.8, EQQQ: 12.1, VWCE: 3.2, AAPL: 100 }
  },
  { 
    name: 'Microsoft Corp.', 
    ticker: 'MSFT', 
    sector: 'Technology', 
    country: 'US',
    weights: { SPY: 6.9, QQQ: 10.2, VTI: 6.5, EQQQ: 10.8, VWCE: 3.1, AAPL: 0 }
  },
  { 
    name: 'Amazon.com Inc.', 
    ticker: 'AMZN', 
    sector: 'Consumer Discretionary', 
    country: 'US',
    weights: { SPY: 3.2, QQQ: 5.1, VTI: 3.0, EQQQ: 5.4, VWCE: 1.4, AAPL: 0 }
  },
  { 
    name: 'NVIDIA Corp.', 
    ticker: 'NVDA', 
    sector: 'Technology', 
    country: 'US',
    weights: { SPY: 4.8, QQQ: 7.2, VTI: 4.5, EQQQ: 7.8, VWCE: 2.1, AAPL: 0 }
  },
  { 
    name: 'Alphabet Inc. Class A', 
    ticker: 'GOOGL', 
    sector: 'Communication Services', 
    country: 'US',
    weights: { SPY: 2.1, QQQ: 3.8, VTI: 2.0, EQQQ: 4.1, VWCE: 0.9, AAPL: 0 }
  },
];

export const HoldingsMatrix = ({ selectedETFs }: HoldingsMatrixProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHoldings = mockHoldings.filter(holding =>
    holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holding.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holding.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOverlapCount = (holding: any) => {
    return selectedETFs.filter(etf => holding.weights[etf] > 0).length;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Holdings Matrix</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search holdings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Holding</th>
                <th className="text-left py-3 px-2 font-medium">Sector</th>
                <th className="text-left py-3 px-2 font-medium">Country</th>
                <th className="text-left py-3 px-2 font-medium">Overlap</th>
                {selectedETFs.map((ticker) => (
                  <th key={ticker} className="text-center py-3 px-2 font-medium">
                    <Badge variant="outline" className="font-mono">{ticker}</Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredHoldings.map((holding, index) => (
                <tr key={index} className="border-b hover:bg-accent/50">
                  <td className="py-3 px-2">
                    <div>
                      <div className="font-medium">{holding.name}</div>
                      <div className="text-sm text-muted-foreground">{holding.ticker}</div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className="text-xs">{holding.sector}</Badge>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className="text-xs">{holding.country}</Badge>
                  </td>
                  <td className="py-3 px-2">
                    <Badge 
                      variant={getOverlapCount(holding) > 1 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {getOverlapCount(holding)}/{selectedETFs.length}
                    </Badge>
                  </td>
                  {selectedETFs.map((ticker) => (
                    <td key={ticker} className="py-3 px-2 text-center">
                      <span 
                        className={`text-sm font-medium ${
                          holding.weights[ticker as keyof typeof holding.weights] > 0 
                            ? 'text-foreground' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        {holding.weights[ticker as keyof typeof holding.weights] > 0 
                          ? `${holding.weights[ticker as keyof typeof holding.weights]}%` 
                          : '—'
                        }
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
