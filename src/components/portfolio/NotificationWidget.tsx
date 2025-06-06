
import { useState } from 'react';
import { Bell, Calendar, Newspaper, Settings, Wand2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
      icon: Newspaper,
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
      id: 'economics',
      icon: Calendar,
      title: 'Economics',
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
      <CardContent className="p-4 space-y-4">
        {/* Day/Total Gain Display */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-green-50 rounded-lg">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">DAY GAIN</div>
            <div className="text-sm font-semibold text-green-600">£10.29 (0.01%)</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">TOTAL GAIN</div>
            <div className="text-sm font-semibold text-green-600">£9,667.72 (11.52%)</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
            <Settings className="h-4 w-4 mb-1" />
            <span className="text-xs">Settings</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
            <Wand2 className="h-4 w-4 mb-1" />
            <span className="text-xs">Playground</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
            <TrendingUp className="h-4 w-4 mb-1" />
            <span className="text-xs">Analytics</span>
          </Button>
        </div>

        {/* Notification Sections - Minimized */}
        {notifications.map((notification) => {
          const Icon = notification.icon;
          const isExpanded = expandedSection === notification.id;
          
          return (
            <div key={notification.id} className="border rounded-lg">
              <button
                onClick={() => toggleSection(notification.id)}
                className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className={`p-1.5 rounded-full ${notification.color} text-white`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-sm">{notification.title}</span>
                </div>
                <Badge variant="secondary" className="text-xs">{notification.count}</Badge>
              </button>
              
              {isExpanded && (
                <div className="px-2 pb-2 border-t">
                  <div className="space-y-1 pt-2">
                    {notification.items.map((item, index) => (
                      <div key={index} className="text-xs text-muted-foreground p-2 bg-accent rounded">
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
