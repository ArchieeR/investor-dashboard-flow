
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

export const EarningsCalendar = () => {
  const earnings = [
    { ticker: 'AAPL', company: 'Apple', date: 'Today', time: 'After close' },
    { ticker: 'MSFT', company: 'Microsoft', date: 'Tomorrow', time: 'Before open' },
    { ticker: 'GOOGL', company: 'Alphabet', date: 'Thu', time: 'After close' },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Earnings Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {earnings.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono">
                {item.ticker}
              </Badge>
              <div>
                <div className="text-xs font-medium">{item.company}</div>
                <div className="text-xs text-muted-foreground">{item.time}</div>
              </div>
            </div>
            <div className="text-xs font-medium">{item.date}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
