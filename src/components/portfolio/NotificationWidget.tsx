
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const NotificationWidget = () => {
  const notifications = [
    {
      type: 'gain',
      title: 'Day Gain',
      value: '+£245.67',
      percentage: '+1.24%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      type: 'total-gain',
      title: 'Total Gain',
      value: '+£2,847.92',
      percentage: '+12.8%',
      icon: DollarSign,
      color: 'text-green-600'
    }
  ];

  const marketNews = [
    'FTSE 100 hits record high amid energy sector rally',
    'UK Core Inflation Slows to 2.4% in May, BoE Policy Path in Focus',
    'Bank of England holds rates at 5.25%',
    'Technology sector leads market gains as AI optimism continues'
  ];

  const portfolioAlerts = [
    'EQQQ rebalanced, 2 assets added',
    'SPXP dividend declared: £28.20 on Nov 20',
    'New ETF IPO: HANetf Space Innovation ETF',
    'VWRL dividend payment processed'
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 h-full overflow-auto">
        {/* Day and Total Gains */}
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <notification.icon className={`h-4 w-4 ${notification.color}`} />
              <span className="font-medium text-sm">{notification.title}</span>
            </div>
            <div className="text-right">
              <div className={`font-semibold ${notification.color}`}>{notification.value}</div>
              <div className={`text-xs ${notification.color}`}>{notification.percentage}</div>
            </div>
          </div>
        ))}

        <Separator />

        {/* Unified Notifications Container */}
        <div className="space-y-3">
          {/* Market News Section */}
          <div>
            <div className="font-medium text-sm mb-2 text-blue-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Market News
            </div>
            <div className="space-y-2">
              {marketNews.map((item, itemIndex) => (
                <Card key={itemIndex} className="p-2 bg-blue-50 border-blue-100">
                  <div className="text-xs text-blue-700 leading-relaxed">
                    {item}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Portfolio Alerts Section */}
          <div>
            <div className="font-medium text-sm mb-2 text-orange-900 flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-orange-600" />
              Portfolio Alerts
            </div>
            <div className="space-y-2">
              {portfolioAlerts.map((alert, alertIndex) => (
                <Card key={alertIndex} className="p-2 bg-orange-50 border-orange-100">
                  <div className="text-xs text-orange-700 leading-relaxed">
                    {alert}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
