
import { useState } from 'react';
import { Settings, Wand2, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const NotificationWidget = () => {
  return (
    <Card className="h-fit">
      <CardContent className="p-4 space-y-4">
        {/* Day/Total Gain Display */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-green-50 rounded-lg">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">DAY GAIN</div>
            <div className="text-sm font-semibold text-green-600">£10.29 (0.01%)</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">TOTAL GAIN</div>
            <div className="text-sm font-semibold text-green-600">£9,667.72 (11.52%)</div>
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
      </CardContent>
    </Card>
  );
};
