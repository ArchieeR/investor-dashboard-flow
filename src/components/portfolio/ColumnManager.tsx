
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, GripVertical } from 'lucide-react';
import { ColumnConfig } from '@/types/portfolio';

interface ColumnManagerProps {
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
}

export const ColumnManager = ({ columns, onColumnsChange }: ColumnManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleColumn = (key: string, visible: boolean) => {
    const updatedColumns = columns.map(col => 
      col.key === key ? { ...col, visible } : col
    );
    onColumnsChange(updatedColumns);
  };

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        cardRef.current && 
        buttonRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Button>
    );
  }

  return (
    <Card ref={cardRef} className="absolute right-0 top-12 w-80 z-[150] shadow-lg bg-popover border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Manage Columns</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {columns.map((column) => (
          <div key={column.key} className="flex items-center justify-between p-2 rounded hover:bg-accent">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              <Checkbox
                checked={column.visible}
                onCheckedChange={(checked) => toggleColumn(column.key, !!checked)}
              />
              <span className="text-sm">{column.label}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
