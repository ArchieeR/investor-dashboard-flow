
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, TrendingUp, TrendingDown } from 'lucide-react';

export const NewsFeedWidget = () => {
  const news = [
    {
      headline: 'Tech rally continues as AI stocks surge',
      time: '2h',
      sentiment: 'positive',
      ticker: 'NVDA'
    },
    {
      headline: 'Fed signals potential rate cuts ahead',
      time: '4h',
      sentiment: 'positive',
      ticker: 'SPY'
    },
    {
      headline: 'Energy sector faces headwinds',
      time: '6h',
      sentiment: 'negative',
      ticker: 'XLE'
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-1">
          <Newspaper className="h-3 w-3" />
          Portfolio News
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {news.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium leading-tight">{item.headline}</p>
              <div className="flex items-center gap-1 flex-shrink-0">
                {item.sentiment === 'positive' ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs h-4">
                {item.ticker}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
