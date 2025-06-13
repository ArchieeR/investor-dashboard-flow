
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const CurrencyWidget = () => {
  const currencies = [
    { pair: 'GBP/USD', rate: 1.2543, change: 0.0012, changePercent: 0.10 },
    { pair: 'GBP/EUR', rate: 1.1834, change: -0.0023, changePercent: -0.19 },
    { pair: 'USD/EUR', rate: 0.9434, change: -0.0034, changePercent: -0.36 },
  ];

  return (
    <Card className="h-full border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-sky-700">
          Currency Rates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {currencies.map((currency, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="text-xs font-medium">{currency.pair}</div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono">{currency.rate.toFixed(4)}</span>
              <div className={`flex items-center space-x-1 text-xs ${
                currency.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {currency.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{currency.changePercent >= 0 ? '+' : ''}{currency.changePercent}%</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
