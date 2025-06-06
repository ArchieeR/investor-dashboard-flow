
import { useState } from 'react';
import { Bell, Calendar, News } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const NotificationWidget = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const notifications = [
    {
      id: 'alerts',
      icon: Bell,
      title: 'Alerts',
      count: 1,
      color: 'bg-red-500',
      items: [
        'VUSA dropped 2% today'
      ]
    },
    {
      id: 'news',
      icon: News,
      title: 'News',
      count: 3,
      color: 'bg-blue-500',
      items: [
        'Fed signals rate cuts ahead',
        'Tech earnings beat expectations',
        'Oil prices surge on supply concerns'
      ]
    },
    {
      id: 'events',
      icon: Calendar,
      title: 'Economic Events',
      count: 5,
      color: 'bg-purple-500',
      items: [
        'US CPI Data (Tomorrow)',
        'ECB Meeting (Thu)',
        'UK Employment (Fri)',
        'China PMI (Mon)',
        'US GDP (Tue)'
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Portfolio highlights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Day/Total Gain Display */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-green-50 rounded-lg">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">DAY GAIN</div>
            <div className="text-sm font-semibold text-green-600">+£10.29</div>
            <div className="text-xs text-green-600">↑ 0.01%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">TOTAL GAIN</div>
            <div className="text-sm font-semibold text-green-600">+£9,667.72</div>
            <div className="text-xs text-green-600">↑ 11.52%</div>
          </div>
        </div>

        {/* Notification Sections */}
        {notifications.map((notification) => {
          const Icon = notification.icon;
          const isExpanded = expandedSection === notification.id;
          
          return (
            <div key={notification.id} className="border rounded-lg">
              <button
                onClick={() => toggleSection(notification.id)}
                className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${notification.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{notification.title}</span>
                </div>
                <Badge variant="secondary">{notification.count}</Badge>
              </button>
              
              {isExpanded && (
                <div className="px-3 pb-3 border-t">
                  <div className="space-y-2 pt-2">
                    {notification.items.map((item, index) => (
                      <div key={index} className="text-sm text-muted-foreground p-2 bg-accent rounded">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
