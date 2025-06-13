
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

export const DividendTracker = () => {
  const dividendData = [
    { ticker: 'VUSA', amount: 52.43, date: 'Dec 15', status: 'upcoming' },
    { ticker: 'VTI', amount: 28.91, date: 'Nov 20', status: 'paid' },
    { ticker: 'EQQQ', amount: 15.67, date: 'Oct 25', status: 'paid' },
  ];

  const totalUpcoming = dividendData
    .filter(d => d.status === 'upcoming')
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <Card className="h-full border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-sky-700">
          <TrendingUp className="h-4 w-4" />
          Dividend Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-sky-100 rounded-lg">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-sky-600" />
            <span className="text-xs font-medium text-sky-700">Upcoming</span>
          </div>
          <span className="text-sm font-bold text-sky-800">£{totalUpcoming.toFixed(2)}</span>
        </div>
        
        <div className="space-y-2">
          {dividendData.slice(0, 3).map((dividend, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  dividend.status === 'upcoming' ? 'bg-sky-500' : 'bg-green-500'
                }`} />
                <span className="font-medium">{dividend.ticker}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>£{dividend.amount}</span>
                <span>•</span>
                <span>{dividend.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
