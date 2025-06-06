
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
      count: 1,
      color: 'bg-red-500',
      items: [
        'VUSA dropped 2% today'
      ]
    },
    {
      id: 'news',
      icon: Newspaper,
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
        {/* Day/Total Gain Display - Enhanced */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">DAY GAIN</div>
            <div className="text-lg font-bold text-green-600">£10.29</div>
            <div className="text-sm font-semibold text-green-500">+0.01%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">TOTAL GAIN</div>
            <div className="text-lg font-bold text-green-600">£9,667.72</div>
            <div className="text-sm font-semibold text-green-500">+11.52%</div>
          </div>
        </div>

        {/* Action Buttons - Icon Only */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="flex items-center justify-center p-3 h-10 w-full">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center justify-center p-3 h-10 w-full">
            <Wand2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center justify-center p-3 h-10 w-full">
            <TrendingUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Notification Sections - In a row */}
        <div className="grid grid-cols-3 gap-2">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            const isExpanded = expandedSection === notification.id;
            
            return (
              <div key={notification.id} className="border rounded-lg">
                <button
                  onClick={() => toggleSection(notification.id)}
                  className="w-full p-3 flex items-center justify-center hover:bg-accent transition-colors relative"
                >
                  <div className="relative">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    {/* iOS-style notification badge */}
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {notification.count}
                    </div>
                  </div>
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
        </div>
      </CardContent>
    </Card>
  );
};
