import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';

export interface GridItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  component: React.ComponentType<any>;
  props?: any;
  fixed?: boolean;
  minWidth?: number;
  minHeight?: number;
}

interface GridSystemProps {
  items: GridItem[];
  onItemsChange: (items: GridItem[]) => void;
  columns?: number;
}

export const GridSystem = ({ items, onItemsChange, columns = 8 }: GridSystemProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [resizingItem, setResizingItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  const cellSize = 120; // Base cell size for square grid

  const handleMouseDown = useCallback((e: React.MouseEvent, itemId: string, type: 'drag' | 'resize') => {
    e.preventDefault();
    const item = items.find(i => i.id === itemId);
    if (!item || item.fixed) return;

    if (type === 'drag') {
      setDraggedItem(itemId);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    } else {
      setResizingItem(itemId);
    }
  }, [items]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const gridX = Math.floor((e.clientX - gridRect.left - dragOffset.x) / cellSize);
    const gridY = Math.floor((e.clientY - gridRect.top - dragOffset.y) / cellSize);

    if (draggedItem) {
      const updatedItems = items.map(item => {
        if (item.id === draggedItem) {
          return {
            ...item,
            x: Math.max(0, Math.min(gridX, columns - item.width)),
            y: Math.max(0, gridY)
          };
        }
        return item;
      });
      onItemsChange(updatedItems);
    }

    if (resizingItem) {
      const item = items.find(i => i.id === resizingItem);
      if (item) {
        const newWidth = Math.max(item.minWidth || 1, Math.floor((e.clientX - gridRect.left - item.x * cellSize) / cellSize));
        const newHeight = Math.max(item.minHeight || 1, Math.floor((e.clientY - gridRect.top - item.y * cellSize) / cellSize));
        
        const updatedItems = items.map(i => {
          if (i.id === resizingItem) {
            return {
              ...i,
              width: Math.min(newWidth, columns - i.x),
              height: newHeight
            };
          }
          return i;
        });
        onItemsChange(updatedItems);
      }
    }
  }, [draggedItem, resizingItem, items, onItemsChange, dragOffset, cellSize, columns]);

  const handleMouseUp = useCallback(() => {
    setDraggedItem(null);
    setResizingItem(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  // Add event listeners
  useEffect(() => {
    if (draggedItem || resizingItem) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedItem, resizingItem, handleMouseMove, handleMouseUp]);

  const getMaxRows = () => {
    return Math.max(...items.map(item => item.y + item.height), 4);
  };

  return (
    <div 
      ref={gridRef}
      className="relative w-full"
      style={{ 
        height: `${getMaxRows() * cellSize}px`,
        backgroundImage: `
          linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`
      }}
    >
      {items.map((item) => {
        const Component = item.component;
        return (
          <Card
            key={item.id}
            className={`absolute overflow-hidden transition-all duration-200 ${
              item.fixed ? '' : 'hover:shadow-lg cursor-move'
            } ${draggedItem === item.id ? 'z-50 shadow-2xl' : 'z-10'}`}
            style={{
              left: `${item.x * cellSize}px`,
              top: `${item.y * cellSize}px`,
              width: `${item.width * cellSize}px`,
              height: `${item.height * cellSize}px`,
            }}
            onMouseDown={(e) => !item.fixed && handleMouseDown(e, item.id, 'drag')}
          >
            {!item.fixed && (
              <div className="absolute top-2 right-2 opacity-50 hover:opacity-100 z-20">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            
            <div className="h-full w-full overflow-auto">
              <Component {...(item.props || {})} />
            </div>

            {!item.fixed && (
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20"
                style={{
                  background: 'linear-gradient(-45deg, transparent 30%, hsl(var(--border)) 30%, hsl(var(--border)) 70%, transparent 70%)'
                }}
                onMouseDown={(e) => handleMouseDown(e, item.id, 'resize')}
              />
            )}
          </Card>
        );
      })}
    </div>
  );
};
