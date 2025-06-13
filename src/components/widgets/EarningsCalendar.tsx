
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

export const EarningsCalendar = () => {
  const earnings = [
    { ticker: 'AAPL', company: 'Apple', date: 'Today', time: '🔴 After close' },
    { ticker: 'MSFT', company: 'Microsoft', date: 'Tomorrow', time: '🟢 Before open' },
    { ticker: 'GOOGL', company: 'Alphabet', date: 'Thu', time: '🔴 After close' },
  ];

  return (
    <Card className="h-full flex flex-col rounded-xl border-0 shadow-sm bg-card overflow-hidden">
      <CardHeader className="pb-2 px-4 pt-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Earnings Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-hidden px-4 pb-4">
        {earnings.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Badge variant="outline" className="text-xs font-mono flex-shrink-0 px-2">
                {item.ticker}
              </Badge>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium truncate">{item.company}</div>
                <div className="text-xs text-muted-foreground">{item.time}</div>
              </div>
            </div>
            <div className="text-xs font-medium flex-shrink-0">{item.date}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
