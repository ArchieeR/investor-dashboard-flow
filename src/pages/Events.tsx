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
  tomorrow.setDate(today.getDate() + 1);

  // Helper function to check if date matches selected filter
  const isDateInRange = (eventDate: string, range: string) => {
    const event = new Date(eventDate);
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    
    switch(range) {
      case 'Today':
        return event.toDateString() === today.toDateString();
      case 'Tomorrow':
        return event.toDateString() === tomorrow.toDateString();
      case 'This Week':
        const weekStart = new Date(todayStart);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return event >= weekStart && event <= weekEnd;
      case 'Next Week':
        const nextWeekStart = new Date(todayStart);
        nextWeekStart.setDate(today.getDate() - today.getDay() + 7);
        const nextWeekEnd = new Date(nextWeekStart);
        nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
        return event >= nextWeekStart && event <= nextWeekEnd;
      default:
        return true;
    }
  };

  // Enhanced events data with actual dates and your requested examples
  const earningsData = [
    {
      date: 'Today',
      fullDate: today.toISOString().split('T')[0],
      count: 2,
      events: [
        { time: '4:30 PM', ticker: 'AAPL', company: 'Apple Q2 Earnings Call', type: 'earnings' },
        { time: '7:00 AM', ticker: 'UK', company: 'UK GDP Data Release', type: 'economic' }
      ]
    },
    {
      date: 'Tomorrow', 
      fullDate: tomorrow.toISOString().split('T')[0],
      count: 2,
      events: [
        { time: '2:00 PM', ticker: 'ECB', company: 'ECB Rate Decision', type: 'economic' },
        { time: 'Ex-Date', ticker: 'BP', company: 'BP Dividend Ex-Date', type: 'dividend' }
      ]
    }
  ];

  // This Week events
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay() + 2); // Tuesday
  const thisWeekFriday = new Date(today);
  thisWeekFriday.setDate(today.getDate() - today.getDay() + 5); // Friday
  const thisWeekThursday = new Date(today);
  thisWeekThursday.setDate(today.getDate() - today.getDay() + 4); // Thursday

  const thisWeekEvents = [
    {
      date: 'Friday',
      fullDate: thisWeekFriday.toISOString().split('T')[0],
      count: 1,
      events: [
        { time: '8:30 AM', ticker: 'US', company: 'US Jobs Report', type: 'economic' }
      ]
    },
    {
      date: 'Thursday',
      fullDate: thisWeekThursday.toISOString().split('T')[0],
      count: 1,
      events: [
        { time: 'Rebalance', ticker: 'VUSA', company: 'Vanguard ESG ETF Rebalance', type: 'dividend' }
      ]
    }
  ];

  // Next Week events
  const nextWeekWed = new Date(today);
  nextWeekWed.setDate(today.getDate() - today.getDay() + 10); // Next Wednesday
  const nextWeekThu = new Date(today);
  nextWeekThu.setDate(today.getDate() - today.getDay() + 11); // Next Thursday

  const nextWeekEvents = [
    {
      date: 'Wed (Next Week)',
      fullDate: nextWeekWed.toISOString().split('T')[0],
      count: 1,
      events: [
        { time: '2:00 PM', ticker: 'FED', company: 'FOMC Minutes Release', type: 'economic' }
      ]
    },
    {
      date: 'Thu (Next Week)',
      fullDate: nextWeekThu.toISOString().split('T')[0],
      count: 1,
      events: [
        { time: '4:30 PM', ticker: 'TSLA', company: 'Tesla Q2 Earnings Call', type: 'earnings' }
      ]
    }
  ];

  const dividendEvents = [
    { date: 'Today', fullDate: today.toISOString().split('T')[0], count: 1, events: [{ time: 'Ex-Date', ticker: 'VUSA', company: 'Vanguard S&P 500', type: 'dividend', amount: '£0.52' }] },
    { date: 'Tomorrow', fullDate: tomorrow.toISOString().split('T')[0], count: 1, events: [{ time: 'Ex-Date', ticker: 'BP', company: 'BP Dividend Ex-Date', type: 'dividend', amount: '£0.29' }] }
  ];

  const economicEvents = [
    { date: 'Today', fullDate: today.toISOString().split('T')[0], count: 1, events: [{ time: '7:00 AM', title: 'UK GDP Data Release', type: 'Economic', impact: 'High' }] },
    { date: 'Tomorrow', fullDate: tomorrow.toISOString().split('T')[0], count: 1, events: [{ time: '2:00 PM', title: 'ECB Rate Decision', type: 'Economic', impact: 'High' }] }
  ];

  const politicalEvents = [
    { date: 'Today', fullDate: today.toISOString().split('T')[0], count: 1, events: [{ time: '9:00 AM', title: 'G7 Summit', type: 'Political', impact: 'Medium' }] }
  ];

  // List view data
  const listViewData = [
    {
      ticker: 'AAPL',
      company: 'APPLE INC.',
      marketCap: '3.5T',
      epsEstimate: '1.57',
      reportedEps: '1.58',
      surprise: '0.01',
      surprisePercent: '0.69%',
      revenue: { forecast: '89.5B', actual: '90.0B' },
      date: today.toISOString().split('T')[0],
      time: '4:30 PM',
      trend: 'up'
    },
    {
      ticker: 'TSLA',
      company: 'TESLA INC.',
      marketCap: '800B',
      epsEstimate: '0.66',
      reportedEps: '0.73',
      surprise: '0.07',
      surprisePercent: '10.55%',
      revenue: { forecast: '25.5B', actual: '26.0B' },
      date: nextWeekThu.toISOString().split('T')[0],
      time: '4:30 PM',
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
    let events = [];
    
    // Add earnings data
    if (selectedEarnings) {
      events.push(...earningsData);
      if (selectedWeek === 'This Week') events.push(...thisWeekEvents.filter(e => e.events.some(ev => ev.type === 'earnings')));
      if (selectedWeek === 'Next Week') events.push(...nextWeekEvents.filter(e => e.events.some(ev => ev.type === 'earnings')));
    }
    
    // Add economic data
    if (selectedEconomic) {
      events.push(...economicEvents);
      if (selectedWeek === 'This Week') events.push(...thisWeekEvents.filter(e => e.events.some(ev => ev.type === 'economic')));
      if (selectedWeek === 'Next Week') events.push(...nextWeekEvents.filter(e => e.events.some(ev => ev.type === 'economic')));
    }
    
    // Add political data
    if (selectedPolitical) events.push(...politicalEvents);
    
    // Add dividend data
    if (selectedDividends) {
      events.push(...dividendEvents);
      if (selectedWeek === 'This Week') events.push(...thisWeekEvents.filter(e => e.events.some(ev => ev.type === 'dividend')));
    }
    
    // Filter events based on selected date range
    const filteredEvents = events.filter(dayData => {
      // For "This Week" and "Next Week", we already filtered above
      if (selectedWeek === 'This Week' || selectedWeek === 'Next Week') return true;
      return isDateInRange(dayData.fullDate, selectedWeek);
    });
    
    const mergedEvents = filteredEvents.reduce((acc, dayData) => {
      const existingDay = acc.find(d => d.date === dayData.date);
      if (existingDay) {
        existingDay.events.push(...dayData.events);
        existingDay.count = existingDay.events.length;
      } else {
        acc.push({ ...dayData });
      }
      return acc;
    }, [] as any[]);
    
    return mergedEvents;
  };

  const renderCalendarView = () => {
    const calendarData = getCalendarData();
    
    if (calendarData.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No events found for {selectedWeek}</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    const filteredListData = listViewData.filter(item => 
      isDateInRange(item.date, selectedWeek)
    );

    if (filteredListData.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No earnings data found for {selectedWeek}</p>
        </div>
      );
    }

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
            {filteredListData.map((earning) => (
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
