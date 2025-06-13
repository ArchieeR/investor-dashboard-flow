
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const CalendarButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const calendarEvents = [
    { date: 'Dec 15', type: 'dividend', ticker: 'VUSA', amount: '£52.43' },
    { date: 'Dec 18', type: 'earnings', ticker: 'NVDA', time: '4:30 PM' },
    { date: 'Dec 20', type: 'dividend', ticker: 'VTI', amount: '£28.91' },
    { date: 'Dec 22', type: 'earnings', ticker: 'AAPL', time: '7:00 AM' },
  ];

  const handleCalendarClick = () => {
    navigate('/events');
  };

  if (isOpen) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="border-sky-300 text-sky-700 hover:bg-sky-50"
        >
          <X className="h-4 w-4" />
        </Button>
        <Card className="absolute right-0 top-12 w-80 z-50 border-sky-200 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-sky-700">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {calendarEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-xs font-medium text-sky-800">{event.date}</div>
                  <Badge 
                    variant={event.type === 'dividend' ? 'default' : 'secondary'}
                    className={`text-xs ${event.type === 'dividend' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                  >
                    {event.type}
                  </Badge>
                  <span className="text-xs font-medium">{event.ticker}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {event.amount || event.time}
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              onClick={handleCalendarClick}
            >
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsOpen(true)}
      className="border-sky-300 text-sky-700 hover:bg-sky-50"
    >
      <Calendar className="h-4 w-4" />
    </Button>
  );
};
