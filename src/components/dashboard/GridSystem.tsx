
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
  cellSize?: number;
  allowOverlap?: boolean;
}

export const GridSystem = ({ 
  items, 
  onItemsChange, 
  columns = 8, 
  cellSize = 120,
  allowOverlap = false 
}: GridSystemProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [resizingItem, setResizingItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [ghostPosition, setGhostPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const gridRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic cell dimensions based on container width
  const getCellDimensions = useCallback(() => {
    const actualWidth = containerWidth || (gridRef.current?.clientWidth ?? 0);
    if (!actualWidth) return { cellWidth: cellSize, cellHeight: cellSize };
    
    const cellWidth = actualWidth / columns;
    const cellHeight = cellSize; // Keep height consistent
    
    return { cellWidth, cellHeight };
  }, [columns, cellSize, containerWidth]);

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (gridRef.current) {
        const newWidth = gridRef.current.clientWidth;
        setContainerWidth(newWidth);
      }
    };

    // Initial measurement
    updateWidth();

    // Set up resize observer for responsive updates
    const resizeObserver = new ResizeObserver(updateWidth);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Comprehensive collision resolution that handles cascading displacement
  const resolveAllCollisions = (newItems: GridItem[]) => {
    if (allowOverlap) return newItems;

    let workingItems = [...newItems];
    let hasChanges = true;
    let iterations = 0;
    const maxIterations = 50; // Prevent infinite loops

    // Sort by y position to handle displacement from top to bottom
    const sortByPosition = (items: GridItem[]) => 
      items.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);

    while (hasChanges && iterations < maxIterations) {
      hasChanges = false;
      iterations++;
      
      workingItems = sortByPosition(workingItems);

      for (let i = 0; i < workingItems.length; i++) {
        const currentItem = workingItems[i];
        if (currentItem.fixed) continue;

        // Find all items this one collides with
        const collidingItems = workingItems.filter((other, otherIndex) => {
          if (otherIndex === i || other.fixed) return false;
          
          return !(
            currentItem.x >= other.x + other.width ||
            currentItem.x + currentItem.width <= other.x ||
            currentItem.y >= other.y + other.height ||
            currentItem.y + currentItem.height <= other.y
          );
        });

        // Push colliding items down
        for (const collidingItem of collidingItems) {
          const itemIndex = workingItems.findIndex(item => item.id === collidingItem.id);
          if (itemIndex !== -1) {
            const newY = currentItem.y + currentItem.height;
            if (workingItems[itemIndex].y < newY) {
              workingItems[itemIndex] = { ...workingItems[itemIndex], y: newY };
              hasChanges = true;
            }
          }
        }
      }
    }

    return workingItems;
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
    const { cellWidth, cellHeight } = getCellDimensions();

    if (draggedItem) {
      const item = items.find(i => i.id === draggedItem);
      if (!item) return;

      const gridX = Math.max(0, Math.floor((e.clientX - gridRect.left - dragOffset.x) / cellWidth));
      const gridY = Math.max(0, Math.floor((e.clientY - gridRect.top - dragOffset.y) / cellHeight));
      const constrainedX = Math.max(0, Math.min(gridX, columns - item.width));
      const constrainedY = Math.max(0, gridY);

      setGhostPosition({ x: constrainedX, y: constrainedY, width: item.width, height: item.height });
    }

    if (resizingItem) {
      const item = items.find(i => i.id === resizingItem);
      if (!item) return;

      const newWidth = Math.max(item.minWidth || 2, Math.min(4, Math.floor((e.clientX - gridRect.left - item.x * cellWidth) / cellWidth)));
      const newHeight = Math.max(item.minHeight || 2, Math.min(4, Math.floor((e.clientY - gridRect.top - item.y * cellHeight) / cellHeight)));

      setGhostPosition({ x: item.x, y: item.y, width: newWidth, height: newHeight });
    }
  }, [draggedItem, resizingItem, items, dragOffset, columns, getCellDimensions]);

  const handleMouseUp = useCallback(() => {
    if (draggedItem && ghostPosition) {
      const updatedItems = items.map(item => {
        if (item.id === draggedItem) {
          return { ...item, x: ghostPosition.x, y: ghostPosition.y };
        }
        return item;
      });
      
      const resolvedItems = resolveAllCollisions(updatedItems);
      onItemsChange(resolvedItems);
    }

    if (resizingItem && ghostPosition) {
      const updatedItems = items.map(item => {
        if (item.id === resizingItem) {
          return { ...item, width: ghostPosition.width, height: ghostPosition.height };
        }
        return item;
      });
      
      const resolvedItems = resolveAllCollisions(updatedItems);
      onItemsChange(resolvedItems);
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
    return Math.max(...items.map(item => item.y + item.height), 3);
  };

  const { cellWidth, cellHeight } = getCellDimensions();

  return (
    <div className="w-full">
      <div 
        ref={gridRef}
        className="relative w-full"
        style={{ 
          height: `${getMaxRows() * cellHeight}px`,
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: `${cellWidth}px ${cellHeight}px`
        }}
      >
        {/* Ghost position indicator */}
        {ghostPosition && (draggedItem || resizingItem) && (
          <div
            className="absolute border-2 border-dashed border-primary bg-primary/10 rounded-lg z-40 pointer-events-none"
            style={{
              left: `${ghostPosition.x * cellWidth}px`,
              top: `${ghostPosition.y * cellHeight}px`,
              width: `${ghostPosition.width * cellWidth}px`,
              height: `${ghostPosition.height * cellHeight}px`,
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
              className={`absolute transition-all duration-200 ${
                item.fixed ? '' : 'hover:shadow-lg cursor-move'
              } ${isDragging || isResizing ? 'z-50 shadow-2xl opacity-75' : 'z-10'}`}
              style={{
                left: `${item.x * cellWidth}px`,
                top: `${item.y * cellHeight}px`,
                width: `${item.width * cellWidth}px`,
                height: `${item.height * cellHeight}px`,
              }}
              onMouseDown={(e) => !item.fixed && handleMouseDown(e, item.id, 'drag')}
            >
              {!item.fixed && (
                <div className="absolute top-2 right-2 opacity-50 hover:opacity-100 z-20">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              
              <div className="h-full w-full overflow-hidden p-1">
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
    </div>
  );
};
