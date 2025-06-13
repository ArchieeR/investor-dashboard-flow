
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

// Valid widget sizes for iPad-style grid (minimum 2x2)
const VALID_SIZES = [
  { w: 2, h: 2 }, { w: 2, h: 4 }, { w: 3, h: 3 }, 
  { w: 4, h: 2 }, { w: 4, h: 4 }, { w: 4, h: 6 }, { w: 4, h: 8 },
  { w: 6, h: 2 }, { w: 6, h: 4 }, { w: 8, h: 2 }, { w: 8, h: 4 }, { w: 8, h: 8 }
];

export const GridSystem = ({ items, onItemsChange, columns = 8 }: GridSystemProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [resizingItem, setResizingItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [ghostPosition, setGhostPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cellSize = 120; // Square cells

  // Check if a position would cause collision with other items
  const hasCollision = (x: number, y: number, width: number, height: number, excludeId?: string) => {
    return items.some(item => {
      if (item.id === excludeId) return false;
      
      return !(
        x >= item.x + item.width ||
        x + width <= item.x ||
        y >= item.y + item.height ||
        y + height <= item.y
      );
    });
  };

  // Push logic - move widgets down when collision occurs
  const pushWidgetsDown = (newItem: { x: number; y: number; width: number; height: number }, excludeId?: string) => {
    const conflictingItems = items.filter(item => {
      if (item.id === excludeId || item.fixed) return false;
      
      return !(
        newItem.x >= item.x + item.width ||
        newItem.x + newItem.width <= item.x ||
        newItem.y >= item.y + item.height ||
        newItem.y + newItem.height <= item.y
      );
    });

    if (conflictingItems.length === 0) return items;

    const updatedItems = [...items];
    
    // Calculate how far down to push
    const pushDistance = (newItem.y + newItem.height) - Math.min(...conflictingItems.map(item => item.y));
    
    conflictingItems.forEach(conflictItem => {
      const itemIndex = updatedItems.findIndex(item => item.id === conflictItem.id);
      if (itemIndex !== -1) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          y: updatedItems[itemIndex].y + pushDistance
        };
      }
    });

    return updatedItems;
  };

  // Get the closest valid size for resizing
  const getClosestValidSize = (targetWidth: number, targetHeight: number, minWidth: number = 2, minHeight: number = 2) => {
    const validOptions = VALID_SIZES.filter(size => 
      size.w >= Math.max(minWidth, 2) && 
      size.h >= Math.max(minHeight, 2) && 
      size.w <= columns
    );
    
    let closest = validOptions[0];
    let minDistance = Math.abs(targetWidth - closest.w) + Math.abs(targetHeight - closest.h);
    
    for (const size of validOptions) {
      const distance = Math.abs(targetWidth - size.w) + Math.abs(targetHeight - size.h);
      if (distance < minDistance) {
        closest = size;
        minDistance = distance;
      }
    }
    
    return closest;
  };

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

    if (draggedItem) {
      const item = items.find(i => i.id === draggedItem);
      if (!item) return;

      const gridX = Math.max(0, Math.floor((e.clientX - gridRect.left - dragOffset.x) / cellSize));
      const gridY = Math.max(0, Math.floor((e.clientY - gridRect.top - dragOffset.y) / cellSize));

      const constrainedX = Math.max(0, Math.min(gridX, columns - item.width));
      const constrainedY = Math.max(0, gridY);

      // Show ghost position
      setGhostPosition({ x: constrainedX, y: constrainedY, width: item.width, height: item.height });
    }

    if (resizingItem) {
      const item = items.find(i => i.id === resizingItem);
      if (!item) return;

      const newWidth = Math.max(2, Math.floor((e.clientX - gridRect.left - item.x * cellSize) / cellSize));
      const newHeight = Math.max(2, Math.floor((e.clientY - gridRect.top - item.y * cellSize) / cellSize));
      
      const closestSize = getClosestValidSize(newWidth, newHeight, item.minWidth, item.minHeight);

      // Show ghost for resize
      setGhostPosition({ x: item.x, y: item.y, width: closestSize.w, height: closestSize.h });
    }
  }, [draggedItem, resizingItem, items, dragOffset, cellSize, columns]);

  const handleMouseUp = useCallback(() => {
    if (draggedItem && ghostPosition) {
      const item = items.find(i => i.id === draggedItem);
      if (item) {
        // Apply push logic
        const newPosition = { x: ghostPosition.x, y: ghostPosition.y, width: item.width, height: item.height };
        const pushedItems = pushWidgetsDown(newPosition, draggedItem);
        
        const updatedItems = pushedItems.map(i => {
          if (i.id === draggedItem) {
            return { ...i, x: ghostPosition.x, y: ghostPosition.y };
          }
          return i;
        });
        
        onItemsChange(updatedItems);
      }
    }

    if (resizingItem && ghostPosition) {
      const item = items.find(i => i.id === resizingItem);
      if (item) {
        // Apply push logic for resize
        const newSize = { x: item.x, y: item.y, width: ghostPosition.width, height: ghostPosition.height };
        const pushedItems = pushWidgetsDown(newSize, resizingItem);
        
        const updatedItems = pushedItems.map(i => {
          if (i.id === resizingItem) {
            return { ...i, width: ghostPosition.width, height: ghostPosition.height };
          }
          return i;
        });
        
        onItemsChange(updatedItems);
      }
    }

    setDraggedItem(null);
    setResizingItem(null);
    setDragOffset({ x: 0, y: 0 });
    setGhostPosition(null);
  }, [draggedItem, resizingItem, ghostPosition, items, onItemsChange]);

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
    return Math.max(...items.map(item => item.y + item.height), 10);
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
      {/* Ghost position indicator */}
      {ghostPosition && (
        <div
          className="absolute border-2 border-dashed border-primary bg-primary/10 rounded-lg z-40 pointer-events-none"
          style={{
            left: `${ghostPosition.x * cellSize}px`,
            top: `${ghostPosition.y * cellSize}px`,
            width: `${ghostPosition.width * cellSize}px`,
            height: `${ghostPosition.height * cellSize}px`,
          }}
        />
      )}

      {items.map((item) => {
        const Component = item.component;
        const isDragging = draggedItem === item.id;
        const isResizing = resizingItem === item.id;
        
        return (
          <Card
            key={item.id}
            className={`absolute transition-all duration-200 rounded-xl overflow-hidden ${
              item.fixed ? 'shadow-sm' : 'hover:shadow-lg cursor-move'
            } ${isDragging || isResizing ? 'z-50 shadow-2xl opacity-75' : 'z-10'}`}
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
            
            <div className="h-full w-full overflow-hidden">
              <Component {...(item.props || {})} />
            </div>

            {!item.fixed && (
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20 opacity-50 hover:opacity-100"
                style={{
                  background: 'linear-gradient(-45deg, transparent 30%, hsl(var(--primary)) 30%, hsl(var(--primary)) 70%, transparent 70%)'
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
