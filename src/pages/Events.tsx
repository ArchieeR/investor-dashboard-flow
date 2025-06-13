
import { useState, useMemo } from 'react';
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
  const [selectedWeek, setSelectedWeek] = useState('Today');
  const [eventType, setEventType] = useState('mixed');
  const [selectedETF, setSelectedETF] = useState('all');
  const [selectedEarnings, setSelectedEarnings] = useState(true);
  const [selectedEconomic, setSelectedEconomic] = useState(true);
  const [selectedPolitical, setSelectedPolitical] = useState(true);
  const [selectedDividends, setSelectedDividends] = useState(true);

  const weekOptions = ['Today', 'Tomorrow', 'This Week', 'Next Week'];
  const etfOptions = ['all', 'SPY', 'QQQ', 'VTI', 'EQQQ', 'VWCE', 'SGLN', 'IIND', 'IJPN', 'IJXP', 'SEMA', 'IEEM'];

  // Get current date for filtering
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Function to get date range based on selection
  const getDateRange = (selection: string) => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const nextWeekStart = new Date(endOfWeek);
    nextWeekStart.setDate(endOfWeek.getDate() + 1);
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

    switch (selection) {
      case 'Today':
        return { start: today, end: today };
      case 'Tomorrow':
        return { start: tomorrow, end: tomorrow };
      case 'This Week':
        return { start: startOfWeek, end: endOfWeek };
      case 'Next Week':
        return { start: nextWeekStart, end: nextWeekEnd };
      default:
        return { start: today, end: today };
    }
  };

  // Dynamic events data based on current date
  const generateEventsForDate = (date: Date, dayOffset: number = 0) => {
    const eventDate = new Date(date);
    eventDate.setDate(date.getDate() + dayOffset);
    
    const dayName = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = eventDate.getDate();
    
    const events = [];
    
    // Add some dynamic earnings events
    if (dayOffset === 0) {
      events.push({ time: '7:00 AM', ticker: 'AAPL', company: 'Apple Inc.', type: 'earnings' });
      events.push({ time: '4:30 PM', ticker: 'MSFT', company: 'Microsoft Corp.', type: 'earnings' });
    } else if (dayOffset === 1) {
      events.push({ time: '6:00 AM', ticker: 'GOOGL', company: 'Alphabet Inc.', type: 'earnings' });
      events.push({ time: '4:15 PM', ticker: 'TSLA', company: 'Tesla Inc.', type: 'earnings' });
    } else if (dayOffset === 2) {
      events.push({ time: '7:00 AM', ticker: 'META', company: 'Meta Platforms Inc.', type: 'earnings' });
    }

    // Add dividend events
    if (dayOffset === 0 || dayOffset === 3) {
      events.push({ time: 'Ex-Date', ticker: 'VUSA', company: 'Vanguard S&P 500', type: 'dividend', amount: '£0.52' });
    }

    // Add economic events
    if (dayOffset === 0) {
      events.push({ time: '2:00 PM', title: 'Federal Reserve Interest Rate Decision', type: 'Economic', impact: 'High' });
    } else if (dayOffset === 2) {
      events.push({ time: '8:45 AM', title: 'ECB Monetary Policy Meeting', type: 'Economic', impact: 'High' });
    }

    // Add political events
    if (dayOffset === 0) {
      events.push({ time: '9:00 AM', title: 'G7 Summit', type: 'Political', impact: 'Medium' });
    }

    return {
      date: `${dayName} ${dayNum}`,
      count: events.length,
      events: events
    };
  };

  // Generate calendar data based on selected filter
  const calendarData = useMemo(() => {
    const range = getDateRange(selectedWeek);
    const days = [];
    
    if (selectedWeek === 'Today') {
      days.push(generateEventsForDate(today, 0));
    } else if (selectedWeek === 'Tomorrow') {
      days.push(generateEventsForDate(today, 1));
    } else if (selectedWeek === 'This Week') {
      for (let i = 0; i < 7; i++) {
        days.push(generateEventsForDate(range.start, i));
      }
    } else if (selectedWeek === 'Next Week') {
      for (let i = 0; i < 7; i++) {
        days.push(generateEventsForDate(range.start, i));
      }
    }

    // Filter events based on selected types
    return days.map(day => ({
      ...day,
      events: day.events.filter(event => {
        if (event.type === 'earnings' && !selectedEarnings) return false;
        if (event.type === 'dividend' && !selectedDividends) return false;
        if (event.type === 'Economic' && !selectedEconomic) return false;
        if (event.type === 'Political' && !selectedPolitical) return false;
        return true;
      }),
      count: day.events.filter(event => {
        if (event.type === 'earnings' && !selectedEarnings) return false;
        if (event.type === 'dividend' && !selectedDividends) return false;
        if (event.type === 'Economic' && !selectedEconomic) return false;
        if (event.type === 'Political' && !selectedPolitical) return false;
        return true;
      }).length
    }));
  }, [selectedWeek, selectedEarnings, selectedDividends, selectedEconomic, selectedPolitical]);

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

  const renderCalendarView = () => {
    const isGridLayout = selectedWeek === 'This Week' || selectedWeek === 'Next Week';
    const gridCols = isGridLayout ? 'grid-cols-7' : calendarData.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
    
    return (
      <div className={`grid ${gridCols} gap-4`}>
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
                  {event.amount && (
                    <div className="text-xs text-green-600 font-medium mt-1">
                      {event.amount}
                    </div>
                  )}
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
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="earnings" 
                    checked={selectedEarnings} 
                    onCheckedChange={(checked) => setSelectedEarnings(checked === true)} 
                  />
                  <label htmlFor="earnings" className="text-sm font-medium">Earnings</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dividends" 
                    checked={selectedDividends} 
                    onCheckedChange={(checked) => setSelectedDividends(checked === true)} 
                  />
                  <label htmlFor="dividends" className="text-sm font-medium">Dividends</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="economic" 
                    checked={selectedEconomic} 
                    onCheckedChange={(checked) => setSelectedEconomic(checked === true)} 
                  />
                  <label htmlFor="economic" className="text-sm font-medium">Economic</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="political" 
                    checked={selectedPolitical} 
                    onCheckedChange={(checked) => setSelectedPolitical(checked === true)} 
                  />
                  <label htmlFor="political" className="text-sm font-medium">Political</label>
                </div>
              </div>
              
              <Select value={selectedETF} onValueChange={setSelectedETF}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assets</SelectItem>
                  {etfOptions.slice(1).map(etf => (
                    <SelectItem key={etf} value={etf}>{etf}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {selectedWeek === 'Today' ? today.toLocaleDateString() : 
                   selectedWeek === 'Tomorrow' ? tomorrow.toLocaleDateString() :
                   selectedWeek}
                </span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">Week</Button>
              </div>
            </div>
          </div>

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

          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              {renderCalendarView()}
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              {selectedEarnings ? renderListView() : renderCalendarView()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Events;
