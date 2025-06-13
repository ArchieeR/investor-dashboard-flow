
import { useState } from 'react';
import { Plus, Bookmark, Filter, MoreVertical, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const mockSavedViews = [
  {
    id: '1',
    name: 'EPS + Revenue + Margin',
    filters: ['EPS', 'Revenue', 'Profit Margin'],
    tickers: ['AAPL', 'MSFT', 'GOOGL'],
    lastUsed: '2024-01-20'
  },
  {
    id: '2',
    name: 'Tech Earnings Overview',
    filters: ['All Metrics'],
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'],
    lastUsed: '2024-01-18'
  },
  {
    id: '3',
    name: 'Quarterly Deep Dive',
    filters: ['EPS', 'Revenue', 'Guidance'],
    tickers: ['AAPL'],
    lastUsed: '2024-01-15'
  }
];

export const SavedViews = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newViewName, setNewViewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateView = () => {
    if (newViewName.trim()) {
      console.log('Creating new view:', newViewName);
      setNewViewName('');
      setIsCreating(false);
    }
  };

  return (
    <Card className="h-fit">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Saved Views
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {isCreating && (
              <div className="space-y-2 p-3 border rounded-lg bg-accent/20">
                <Input
                  placeholder="Enter view name..."
                  value={newViewName}
                  onChange={(e) => setNewViewName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateView()}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleCreateView}>Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => setIsCreating(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Template
            </Button>

            <div className="space-y-3">
              {mockSavedViews.map((view) => (
                <div key={view.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{view.name}</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-3 w-3 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <Trash className="h-3 w-3 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {view.filters.map((filter, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {filter}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Tickers: {view.tickers.join(', ')}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Last used: {new Date(view.lastUsed).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                    <Filter className="h-3 w-3 mr-2" />
                    Apply View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
