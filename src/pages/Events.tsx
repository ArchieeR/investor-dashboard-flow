
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('Events');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Federal Reserve Interest Rate Decision',
      date: '2025-06-15',
      time: '2:00 PM EST',
      location: 'Washington, D.C.',
      type: 'Economic',
      impact: 'High',
      description: 'The Federal Reserve will announce their decision on interest rates.'
    },
    {
      id: 2,
      title: 'Apple WWDC 2025',
      date: '2025-06-10',
      time: '10:00 AM PST',
      location: 'Cupertino, CA',
      type: 'Corporate',
      impact: 'Medium',
      description: 'Apple\'s annual Worldwide Developers Conference.'
    },
    {
      id: 3,
      title: 'ECB Monetary Policy Meeting',
      date: '2025-06-18',
      time: '8:45 AM CET',
      location: 'Frankfurt, Germany',
      type: 'Economic',
      impact: 'High',
      description: 'European Central Bank monetary policy decision.'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Market Events</h1>
          </div>
          
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="mt-2">{event.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{event.type}</Badge>
                      <Badge variant={getImpactColor(event.impact)}>{event.impact} Impact</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
