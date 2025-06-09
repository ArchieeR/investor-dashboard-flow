
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, TrendingUp, TrendingDown } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('Events');
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  const [eventType, setEventType] = useState('earnings');

  const weekOptions = ['Yesterday', 'Today', 'Tomorrow', 'This Week', 'Next Week'];

  // Earnings data with random tickers
  const earningsData = [
    {
      date: 'Mon 9',
      count: 2,
      events: [
        {
          time: '7:00 AM',
          ticker: 'AAPL',
          company: 'Apple Inc.',
          type: 'earnings'
        },
        {
          time: '4:30 PM',
          ticker: 'MSFT',
          company: 'Microsoft Corp.',
          type: 'earnings'
        }
      ]
    },
    {
      date: 'Tue 10', 
      count: 4,
      events: [
        {
          time: '6:00 AM',
          ticker: 'GOOGL',
          company: 'Alphabet Inc.',
          type: 'earnings'
        },
        {
          time: '7:30 AM',
          ticker: 'AMZN', 
          company: 'Amazon.com Inc.',
          type: 'earnings'
        },
        {
          time: '4:15 PM',
          ticker: 'TSLA',
          company: 'Tesla Inc.',
          type: 'earnings'
        },
        {
          time: '5:00 PM',
          ticker: 'NVDA',
          company: 'NVIDIA Corp.',
          type: 'earnings'
        }
      ]
    },
    {
      date: 'Wed 11',
      count: 3,
      events: [
        {
          time: '7:00 AM',
          ticker: 'META',
          company: 'Meta Platforms Inc.',
          type: 'earnings'
        },
        {
          time: '4:30 PM',
          ticker: 'NFLX',
          company: 'Netflix Inc.',
          type: 'earnings'
        },
        {
          time: '5:15 PM',
          ticker: 'CRM',
          company: 'Salesforce Inc.',
          type: 'earnings'
        }
      ]
    },
    {
      date: 'Thu 12',
      count: 5,
      events: [
        {
          time: '6:30 AM',
          ticker: 'ORCL',
          company: 'Oracle Corp.',
          type: 'earnings'
        },
        {
          time: '7:00 AM',
          ticker: 'ADBE',
          company: 'Adobe Inc.',
          type: 'earnings'
        },
        {
          time: '4:30 PM',
          ticker: 'PYPL',
          company: 'PayPal Holdings Inc.',
          type: 'earnings'
        }
      ]
    },
    {
      date: 'Fri 13',
      count: 6,
      events: [
        {
          time: '6:00 AM',
          ticker: 'INTC',
          company: 'Intel Corp.',
          type: 'earnings'
        },
        {
          time: '7:30 AM',
          ticker: 'AMD',
          company: 'Advanced Micro Devices',
          type: 'earnings'
        },
        {
          time: '4:00 PM',
          ticker: 'QCOM',
          company: 'Qualcomm Inc.',
          type: 'earnings'
        },
        {
          time: '5:00 PM',
          ticker: 'AVGO',
          company: 'Broadcom Inc.',
          type: 'earnings'
        }
      ]
    },
    {
      date: 'Sat 14',
      count: 0,
      events: []
    }
  ];

  // Economic events data
  const economicEvents = [
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
      title: 'ECB Monetary Policy Meeting',
      date: '2025-06-18',
      time: '8:45 AM CET',
      location: 'Frankfurt, Germany',
      type: 'Economic',
      impact: 'High',
      description: 'European Central Bank monetary policy decision.'
    },
    {
      id: 3,
      title: 'US Non-Farm Payrolls',
      date: '2025-06-20',
      time: '8:30 AM EST',
      location: 'Washington, D.C.',
      type: 'Economic',
      impact: 'High',
      description: 'Monthly employment data release.'
    }
  ];

  // Political events data
  const politicalEvents = [
    {
      id: 1,
      title: 'G7 Summit',
      date: '2025-06-14',
      time: '9:00 AM',
      location: 'Tokyo, Japan',
      type: 'Political',
      impact: 'Medium',
      description: 'Annual meeting of G7 leaders.'
    },
    {
      id: 2,
      title: 'EU Trade Policy Meeting',
      date: '2025-06-16',
      time: '10:00 AM CET',
      location: 'Brussels, Belgium',
      type: 'Political',
      impact: 'Medium',
      description: 'EU trade policy discussions.'
    }
  ];

  const listViewData = [
    {
      ticker: 'AVGO',
      company: 'BROADCOM INC.',
      marketCap: '1.16T',
      epsEstimate: '1.57',
      reportedEps: '1.58',
      surprise: '0.01',
      surprisePercent: '0.69%',
      revenue: { forecast: '14.96B', actual: '15B' },
      date: '2025-06-05',
      time: '2025-04-30',
      trend: 'up'
    },
    {
      ticker: 'CRWD',
      company: 'CROWDSTRIKE HOLDINGS, INC.',
      marketCap: '116.75B',
      epsEstimate: '0.66',
      reportedEps: '0.73',
      surprise: '0.07',
      surprisePercent: '10.55%',
      revenue: { forecast: '1.1B', actual: '1.1B' },
      date: '2025-06-03',
      time: '2025-04-30',
      trend: 'up'
    },
    {
      ticker: 'FERG',
      company: 'FERGUSON ENTERPRISES INC.',
      marketCap: '41.61B',
      epsEstimate: '2.01',
      reportedEps: '2.50',
      surprise: '0.49',
      surprisePercent: '24.19%',
      revenue: { forecast: '7.42B', actual: '7.62B' },
      date: '2025-06-03',
      time: '2025-04-30',
      trend: 'up'
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

  const renderEconomicEvents = () => {
    return (
      <div className="grid gap-4">
        {economicEvents.map((event) => (
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
    );
  };

  const renderPoliticalEvents = () => {
    return (
      <div className="grid gap-4">
        {politicalEvents.map((event) => (
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
    );
  };

  const renderCalendarView = () => {
    if (eventType === 'economic') return renderEconomicEvents();
    if (eventType === 'political') return renderPoliticalEvents();
    
    return (
      <div className="grid grid-cols-7 gap-4">
        {earningsData.map((day, index) => (
          <Card key={index} className={`min-h-[300px] ${day.count > 0 ? 'hover:shadow-md' : ''} transition-shadow`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{day.date}</CardTitle>
                {day.count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {day.count}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {day.events.slice(0, 4).map((event, eventIndex) => (
                <div key={eventIndex} className="p-2 bg-accent/50 rounded text-xs">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="font-medium text-primary">{event.ticker}</span>
                    <span className="text-muted-foreground">{event.time}</span>
                  </div>
                  <div className="font-medium text-xs leading-tight">
                    {event.company}
                  </div>
                </div>
              ))}
              {day.count > 4 && (
                <div className="text-xs text-muted-foreground text-center pt-1">
                  +{day.count - 4} more
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 text-sm font-medium">Ticker</th>
              <th className="text-left p-2 text-sm font-medium">Market Cap</th>
              <th className="text-left p-2 text-sm font-medium">EPS Estimate</th>
              <th className="text-left p-2 text-sm font-medium">Reported EPS</th>
              <th className="text-left p-2 text-sm font-medium">Surprise</th>
              <th className="text-left p-2 text-sm font-medium">Surprise %</th>
              <th className="text-left p-2 text-sm font-medium">Revenue Forecast</th>
              <th className="text-left p-2 text-sm font-medium">Revenue Actual</th>
              <th className="text-left p-2 text-sm font-medium">Date</th>
              <th className="text-left p-2 text-sm font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {listViewData.map((earning) => (
              <tr key={earning.ticker} className="border-b hover:bg-accent/50">
                <td className="p-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{earning.ticker.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{earning.ticker}</div>
                      <div className="text-xs text-muted-foreground">{earning.company}</div>
                    </div>
                  </div>
                </td>
                <td className="p-2 text-sm">{earning.marketCap}</td>
                <td className="p-2 text-sm">{earning.epsEstimate}</td>
                <td className="p-2 text-sm">{earning.reportedEps}</td>
                <td className="p-2 text-sm text-green-600">{earning.surprise}</td>
                <td className="p-2 text-sm text-green-600">{earning.surprisePercent}</td>
                <td className="p-2 text-sm">{earning.revenue.forecast}</td>
                <td className="p-2 text-sm">{earning.revenue.actual}</td>
                <td className="p-2 text-sm">{earning.date}</td>
                <td className="p-2 text-sm">{earning.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Events</h1>
            <div className="flex items-center space-x-4">
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earnings">Earnings</SelectItem>
                  <SelectItem value="economic">Economic Events</SelectItem>
                  <SelectItem value="political">Political Events</SelectItem>
                </SelectContent>
              </Select>
              
              {eventType === 'earnings' && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">Jun 8 - 14</span>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">Week</Button>
                </div>
              )}
            </div>
          </div>

          {eventType === 'earnings' && (
            <div className="flex space-x-2 mb-6">
              {weekOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedWeek === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedWeek(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              {renderCalendarView()}
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              {eventType === 'earnings' ? renderListView() : (
                eventType === 'economic' ? renderEconomicEvents() : renderPoliticalEvents()
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Events;
