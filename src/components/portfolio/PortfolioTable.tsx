
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PortfolioItem {
  percentage: number;
  name: string;
  ticker: string;
  type: 'ETF' | 'Stock' | 'Crypto' | 'Bond';
  value: number;
  dayChange: number;
  dayChangePercent: number;
  totalChange: number;
  totalChangePercent: number;
}

const portfolioData: PortfolioItem[] = [
  {
    percentage: 23.4,
    name: 'Vanguard S&P 500',
    ticker: 'VUSA',
    type: 'ETF',
    value: 11259,
    dayChange: 556,
    dayChangePercent: 0.43,
    totalChange: 859,
    totalChangePercent: 8.27
  },
  {
    percentage: 18.0,
    name: 'AstraZeneca',
    ticker: 'AZN',
    type: 'Stock',
    value: 8675,
    dayChange: -102,
    dayChangePercent: -0.55,
    totalChange: -435,
    totalChangePercent: -4.78
  },
  {
    percentage: 15.7,
    name: 'Bitcoin',
    ticker: 'BTC',
    type: 'Crypto',
    value: 7552,
    dayChange: 3899,
    dayChangePercent: 7.21,
    totalChange: -7586,
    totalChangePercent: -39.2
  },
  {
    percentage: 12.8,
    name: 'Invesco EQQQ NASDAQ-100',
    ticker: 'EQQQ',
    type: 'ETF',
    value: 6180,
    dayChange: -45,
    dayChangePercent: -0.09,
    totalChange: 1237,
    totalChangePercent: 10.8
  },
  {
    percentage: 11.2,
    name: 'Amundi IBEX 35 UCITS ETF',
    ticker: 'CS1',
    type: 'ETF',
    value: 5959,
    dayChange: 32,
    dayChangePercent: 0.32,
    totalChange: 1883,
    totalChangePercent: 18.9
  }
];

export const PortfolioTable = () => {
  const [sortBy, setSortBy] = useState<keyof PortfolioItem>('percentage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof PortfolioItem) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedData = [...portfolioData].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * multiplier;
    }
    return String(aVal).localeCompare(String(bVal)) * multiplier;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ETF': return 'bg-blue-100 text-blue-800';
      case 'Stock': return 'bg-green-100 text-green-800';
      case 'Crypto': return 'bg-orange-100 text-orange-800';
      case 'Bond': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Portfolio Holdings</CardTitle>
        <div className="flex space-x-2">
          <button className="text-sm text-muted-foreground hover:text-foreground">
            Sort by price ↓
          </button>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            Visualize
          </button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th 
                  className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('percentage')}
                >
                  % OF PORTFOLIO
                </th>
                <th 
                  className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('name')}
                >
                  NAME
                </th>
                <th 
                  className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('ticker')}
                >
                  TICKER
                </th>
                <th 
                  className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('type')}
                >
                  TYPE
                </th>
                <th 
                  className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground text-right"
                  onClick={() => handleSort('value')}
                >
                  VALUE
                </th>
                <th 
                  className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground text-right"
                  onClick={() => handleSort('dayChange')}
                >
                  DAY CHANGE
                </th>
                <th 
                  className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground text-right"
                  onClick={() => handleSort('totalChange')}
                >
                  TOTAL CHANGE
                </th>
                <th className="pb-3 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={item.ticker} className="border-b hover:bg-accent transition-colors">
                  <td className="py-4">
                    <div className="font-semibold">{item.percentage}%</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{item.name}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-mono text-sm">{item.ticker}</div>
                  </td>
                  <td className="py-4">
                    <Badge variant="secondary" className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </td>
                  <td className="py-4 text-right">
                    <div className="font-semibold">£{item.value.toLocaleString()}</div>
                  </td>
                  <td className="py-4 text-right">
                    <div className={`font-medium ${item.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.dayChange >= 0 ? '+' : ''}£{item.dayChange}
                    </div>
                    <div className={`text-sm ${item.dayChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.dayChangePercent >= 0 ? '+' : ''}{item.dayChangePercent}%
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className={`font-medium ${item.totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.totalChange >= 0 ? '+' : ''}£{item.totalChange}
                    </div>
                    <div className={`text-sm ${item.totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.totalChangePercent >= 0 ? '+' : ''}{item.totalChangePercent}%
                    </div>
                  </td>
                  <td className="py-4">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
