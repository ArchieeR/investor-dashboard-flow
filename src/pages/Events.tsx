import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const Events = () => {
  const [activeTab, setActiveTab] = useState('Events');
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  const [eventType, setEventType] = useState('earnings');
  const [selectedETF, setSelectedETF] = useState('all');
  const [selectedEconomic, setSelectedEconomic] = useState(true);
  const [selectedPolitical, setSelectedPolitical] = useState(true);

  const weekOptions = ['Yesterday', 'Today', 'Tomorrow', 'This Week', 'Next Week'];

  const etfOptions = ['all', 'SPY', 'QQQ', 'VTI', 'EQQQ', 'VWCE', 'SGLN', 'IIND', 'IJPN', 'IJXP', 'SEMA', 'IEEM'];

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

  // Economic events data with calendar structure
  const economicEvents = [
    { date: 'Mon 9', count: 1, events: [{ time: '2:00 PM', title: 'Federal Reserve Interest Rate Decision', type: 'Economic', impact: 'High' }] },
    { date: 'Tue 10', count: 0, events: [] },
    { date: 'Wed 11', count: 1, events: [{ time: '8:45 AM', title: 'ECB Monetary Policy Meeting', type: 'Economic', impact: 'High' }] },
    { date: 'Thu 12', count: 1, events: [{ time: '8:30 AM', title: 'US Non-Farm Payrolls', type: 'Economic', impact: 'High' }] },
    { date: 'Fri 13', count: 0, events: [] },
    { date: 'Sat 14', count: 0, events: [] }
  ];

  // Political events data with calendar structure
  const politicalEvents = [
    { date: 'Mon 9', count: 1, events: [{ time: '9:00 AM', title: 'G7 Summit', type: 'Political', impact: 'Medium' }] },
    { date: 'Tue 10', count: 1, events: [{ time: '10:00 AM', title: 'EU Trade Policy Meeting', type: 'Political', impact: 'Medium' }] },
    { date: 'Wed 11', count: 0, events: [] },
    { date: 'Thu 12', count: 0, events: [] },
    { date: 'Fri 13', count: 0, events: [] },
    { date: 'Sat 14', count: 0, events: [] }
  ];

  // Economic events data
  const economicEventsOld = [
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
  const politicalEventsOld = [
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

  // List view data
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

  const getCalendarData = () => {
    if (eventType === 'earnings') return earningsData;
    
    const events = [];
    if (selectedEconomic) events.push(...economicEvents);
    if (selectedPolitical) events.push(...politicalEvents);
    
    // Merge events by date
    const mergedEvents = events.reduce((acc, dayData) => {
      const existingDay = acc.find(d => d.date === dayData.date);
      if (existingDay) {
        existingDay.events.push(...dayData.events);
        existingDay.count = existingDay.events.length;
      } else {
        acc.push({ ...dayData });
      }
      return acc;
    }, [] as any[]);
    
    return mergedEvents.length > 0 ? mergedEvents : earningsData.map(d => ({ ...d, events: [], count: 0 }));
  };

  const renderCalendarView = () => {
    const calendarData = getCalendarData();
    
    return (
      <div className="grid grid-cols-7 gap-4">
        {calendarData.map((day, index) => (
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
                    <span className="font-medium text-primary">
                      {event.ticker || event.type}
                    </span>
                    <span className="text-muted-foreground">{event.time}</span>
                  </div>
                  <div className="font-medium text-xs leading-tight">
                    {event.company || event.title}
                  </div>
                  {event.impact && (
                    <Badge variant={getImpactColor(event.impact)} className="text-xs mt-1">
                      {event.impact}
                    </Badge>
                  )}
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
                  <SelectItem value="mixed">Economic & Political</SelectItem>
                </SelectContent>
              </Select>
              
              {eventType === 'earnings' && (
                <>
                  <Select value={selectedETF} onValueChange={setSelectedETF}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select ETF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All ETFs</SelectItem>
                      {etfOptions.slice(1).map(etf => (
                        <SelectItem key={etf} value={etf}>{etf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                </>
              )}

              {eventType === 'mixed' && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="economic" 
                      checked={selectedEconomic} 
                      onCheckedChange={setSelectedEconomic} 
                    />
                    <label htmlFor="economic" className="text-sm font-medium">Economic</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="political" 
                      checked={selectedPolitical} 
                      onCheckedChange={setSelectedPolitical} 
                    />
                    <label htmlFor="political" className="text-sm font-medium">Political</label>
                  </div>
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
              {eventType === 'earnings' ? renderListView() : renderCalendarView()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Events;
