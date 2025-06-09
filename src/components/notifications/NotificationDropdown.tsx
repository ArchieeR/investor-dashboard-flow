
import { useState } from 'react';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const notifications = [
  {
    id: 1,
    title: 'VUSA dropped 2% today',
    type: 'alert',
    time: '5 min ago',
    unread: true
  },
  {
    id: 2,
    title: 'Fed signals rate cuts ahead',
    type: 'news',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    title: 'US CPI Data tomorrow at 8:30 AM',
    type: 'calendar',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 4,
    title: 'AAPL earnings beat expectations',
    type: 'news',
    time: '1 day ago',
    unread: false
  },
  {
    id: 5,
    title: 'ECB Meeting scheduled for Thursday',
    type: 'calendar',
    time: '2 days ago',
    unread: false
  }
];

export const NotificationDropdown = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'destructive';
      case 'news': return 'default';
      case 'calendar': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-popover border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-auto p-1"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-80 overflow-y-auto">
            {notificationList.map((notification) => (
              <div key={notification.id}>
                <DropdownMenuItem 
                  className="p-3 cursor-pointer flex-col items-start h-auto"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                      <div className={`text-sm ${notification.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getTypeColor(notification.type)} className="text-xs">
                          {notification.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
          </div>
        </CardContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
