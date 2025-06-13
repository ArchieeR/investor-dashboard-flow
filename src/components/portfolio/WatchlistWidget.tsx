
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, TrendingUp, TrendingDown } from 'lucide-react';

export const WatchlistWidget = () => {
  const watchlist = [
    { ticker: 'NVDA', price: 485.23, change: 12.45, changePercent: 2.6 },
    { ticker: 'TSLA', price: 248.91, change: -5.32, changePercent: -2.1 },
    { ticker: 'AAPL', price: 189.77, change: 1.24, changePercent: 0.7 },
  ];

  return (
    <Card className="h-full border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-sky-700">
          <Eye className="h-4 w-4" />
          Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {watchlist.map((stock, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs font-mono border-sky-300 text-sky-700">
                {stock.ticker}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono">${stock.price}</div>
              <div className={`flex items-center space-x-1 text-xs ${
                stock.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stock.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
