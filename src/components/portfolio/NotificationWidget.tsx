
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      type: 'news',
      title: 'Market News',
      items: [
        'FTSE 100 hits record high amid energy sector rally',
        'UK Core Inflation Slows to 2.4% in May, BoE Policy Path in Focus',
        'Bank of England holds rates at 5.25%'
      ]
    },
    {
      type: 'alert',
      title: 'Portfolio Alert',
      message: 'VWRL dividend payment processed',
      icon: AlertTriangle,
      color: 'text-blue-600'
    }
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
        {notifications.map((notification, index) => (
          <div key={index} className="space-y-2">
            {notification.type === 'gain' && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <notification.icon className={`h-4 w-4 ${notification.color}`} />
                  <span className="font-medium text-sm">{notification.title}</span>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${notification.color}`}>{notification.value}</div>
                  <div className={`text-xs ${notification.color}`}>{notification.percentage}</div>
                </div>
              </div>
            )}
            
            {notification.type === 'news' && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-sm mb-2 text-blue-900">{notification.title}</div>
                <div className="space-y-1">
                  {notification.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-xs text-blue-700 leading-relaxed">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {notification.type === 'alert' && (
              <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                <notification.icon className={`h-4 w-4 ${notification.color} mt-0.5`} />
                <div>
                  <div className="font-medium text-sm text-orange-900">{notification.title}</div>
                  <div className="text-xs text-orange-700 mt-1">{notification.message}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
