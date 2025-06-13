
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote, Edit3, Save } from 'lucide-react';

export const NotesWidget = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState('Remember to rebalance portfolio next month...');

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to localStorage or backend
  };

  return (
    <Card className="h-full border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-sky-700">
            <StickyNote className="h-4 w-4" />
            Notes
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="h-6 w-6 p-0 text-sky-600 hover:text-sky-800 hover:bg-sky-100"
          >
            {isEditing ? <Save className="h-3 w-3" /> : <Edit3 className="h-3 w-3" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[80px] text-xs border-sky-200 focus:border-sky-400 focus:ring-sky-200"
              placeholder="Add your notes..."
            />
            <Button onClick={handleSave} size="sm" className="w-full bg-sky-500 hover:bg-sky-600 text-white">
              Save Note
            </Button>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground leading-relaxed">
            {note}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
