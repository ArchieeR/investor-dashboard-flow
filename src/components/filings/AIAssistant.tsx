
import { MessageSquare, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AIAssistantProps {
  ticker: string;
}

export const AIAssistant = ({ ticker }: AIAssistantProps) => {
  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
          <MessageSquare className="h-5 w-5 text-blue-600" />
        </div>
        
        <div className="flex-1 relative">
          <Input
            placeholder={`Ask the Assistant about ${ticker}'s filings...`}
            className="pr-12 h-12 text-base bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            disabled
          />
          <Button 
            size="sm" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            disabled
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        AI Assistant coming soon - Ask questions about financial data, trends, and insights
      </div>
    </Card>
  );
};
