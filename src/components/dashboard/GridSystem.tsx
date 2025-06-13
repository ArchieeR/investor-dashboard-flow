
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

// Valid widget sizes (width x height)
const VALID_SIZES = [
  { w: 1, h: 1 }, { w: 2, h: 1 }, { w: 3, h: 1 }, { w: 4, h: 1 },
  { w: 2, h: 2 }, { w: 3, h: 2 }, { w: 4, h: 2 }, { w: 4, h: 3 }
];

export const GridSystem = ({ items, onItemsChange, columns = 8 }: GridSystemProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [resizingItem, setResizingItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [ghostPosition, setGhostPosition] = useState<{ x: number; y: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cellSize = 120; // Base cell size for square grid

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

  // Find the next available position for a widget
  const findNextAvailablePosition = (width: number, height: number, excludeId?: string) => {
    const maxRows = Math.max(...items.map(item => item.y + item.height), 10);
    
    for (let y = 0; y <= maxRows; y++) {
      for (let x = 0; x <= columns - width; x++) {
        if (!hasCollision(x, y, width, height, excludeId)) {
          return { x, y };
        }
      }
    }
    
    // If no position found, place at bottom
    return { x: 0, y: maxRows + 1 };
  };

  // Get the closest valid size for resizing
  const getClosestValidSize = (targetWidth: number, targetHeight: number, minWidth: number, minHeight: number) => {
    const validOptions = VALID_SIZES.filter(size => 
      size.w >= minWidth && size.h >= minHeight && size.w <= columns
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
    const gridX = Math.max(0, Math.floor((e.clientX - gridRect.left - dragOffset.x) / cellSize));
    const gridY = Math.max(0, Math.floor((e.clientY - gridRect.top - dragOffset.y) / cellSize));

    if (draggedItem) {
      const item = items.find(i => i.id === draggedItem);
      if (!item) return;

      const constrainedX = Math.max(0, Math.min(gridX, columns - item.width));
      const constrainedY = Math.max(0, gridY);

      // Show ghost position
      setGhostPosition({ x: constrainedX, y: constrainedY });

      // Check for collision and find alternative position if needed
      if (!hasCollision(constrainedX, constrainedY, item.width, item.height, draggedItem)) {
        // No collision, update position
        const updatedItems = items.map(i => {
          if (i.id === draggedItem) {
            return { ...i, x: constrainedX, y: constrainedY };
          }
          return i;
        });
        onItemsChange(updatedItems);
      }
    }

    if (resizingItem) {
      const item = items.find(i => i.id === resizingItem);
      if (!item) return;

      const newWidth = Math.max(1, Math.floor((e.clientX - gridRect.left - item.x * cellSize) / cellSize));
      const newHeight = Math.max(1, Math.floor((e.clientY - gridRect.top - item.y * cellSize) / cellSize));
      
      const closestSize = getClosestValidSize(
        newWidth, 
        newHeight, 
        item.minWidth || 1, 
        item.minHeight || 1
      );

      // Check if resize would cause collision
      if (!hasCollision(item.x, item.y, closestSize.w, closestSize.h, resizingItem)) {
        const updatedItems = items.map(i => {
          if (i.id === resizingItem) {
            return { ...i, width: closestSize.w, height: closestSize.h };
          }
          return i;
        });
        onItemsChange(updatedItems);
      }
    }
  }, [draggedItem, resizingItem, items, onItemsChange, dragOffset, cellSize, columns]);

  const handleMouseUp = useCallback(() => {
    if (draggedItem) {
      const item = items.find(i => i.id === draggedItem);
      if (item && ghostPosition) {
        // Final position check and auto-placement if collision
        if (hasCollision(ghostPosition.x, ghostPosition.y, item.width, item.height, draggedItem)) {
          const newPosition = findNextAvailablePosition(item.width, item.height, draggedItem);
          const updatedItems = items.map(i => {
            if (i.id === draggedItem) {
              return { ...i, x: newPosition.x, y: newPosition.y };
            }
            return i;
          });
          onItemsChange(updatedItems);
        }
      }
    }

    setDraggedItem(null);
    setResizingItem(null);
    setDragOffset({ x: 0, y: 0 });
    setGhostPosition(null);
  }, [draggedItem, ghostPosition, items, onItemsChange]);

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
    return Math.max(...items.map(item => item.y + item.height), 6);
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
      {ghostPosition && draggedItem && (
        <div
          className="absolute border-2 border-dashed border-primary bg-primary/10 rounded-lg z-40 pointer-events-none"
          style={{
            left: `${ghostPosition.x * cellSize}px`,
            top: `${ghostPosition.y * cellSize}px`,
            width: `${items.find(i => i.id === draggedItem)?.width! * cellSize}px`,
            height: `${items.find(i => i.id === draggedItem)?.height! * cellSize}px`,
          }}
        />
      )}

      {items.map((item) => {
        const Component = item.component;
        const isDragging = draggedItem === item.id;
        
        return (
          <Card
            key={item.id}
            className={`absolute transition-all duration-200 ${
              item.fixed ? '' : 'hover:shadow-lg cursor-move'
            } ${isDragging ? 'z-50 shadow-2xl opacity-75' : 'z-10'}`}
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
