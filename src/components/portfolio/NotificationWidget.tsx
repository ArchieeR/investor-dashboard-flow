
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const NotificationWidget = () => {
  const gains = {
    dayGain: { value: '+£245.67', percentage: '+1.24%' },
    totalGain: { value: '+£9,667.72', percentage: '+11.52%' }
  };

  const marketNews = [
    {
      priority: 'HIGH',
      message: 'Fed signals rate cut in September',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      priority: 'MED',
      message: 'UK Core Inflation slows to 2.4%',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    {
      priority: 'LOW',
      message: 'XLE up 0.4% on supply stabilisation',
      color: 'bg-red-100 text-red-800 border-red-200'
    }
  ];

  const portfolioAlerts = [
    'Dividend from VUSA paid: £28.91',
    'ETF rebalanced: 3 new holdings added to DFNG',
    'Cash ISA topped up: +£1,000'
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5" />
          Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-full overflow-auto">
        {/* Gains Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium text-sm text-green-900">Day Gain</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">{gains.dayGain.value}</div>
              <div className="text-xs text-green-600">{gains.dayGain.percentage}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-sm text-blue-900">Total Gain</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-blue-600">{gains.totalGain.value}</div>
              <div className="text-xs text-blue-600">{gains.totalGain.percentage}</div>
            </div>
          </div>
        </div>

        {/* Market News Section */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm text-foreground">Market News</h3>
          <div className="space-y-2">
            {marketNews.map((news, index) => (
              <div key={index} className={`p-3 rounded-lg border ${news.color}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium leading-relaxed">
                      {news.message}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-medium ${news.color} border-current`}
                  >
                    {news.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Alerts Section */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm text-foreground">Portfolio Alerts</h3>
          <div className="space-y-2">
            {portfolioAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-orange-900 leading-relaxed">
                  {alert}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
