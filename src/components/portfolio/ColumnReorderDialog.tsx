
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

interface ColumnReorderDialogProps {
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
}

export const ColumnReorderDialog = ({ columns, onColumnsChange }: ColumnReorderDialogProps) => {
  const [localColumns, setLocalColumns] = useState(columns);
  const [isOpen, setIsOpen] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedColumns = Array.from(localColumns);
    const [reorderedItem] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, reorderedItem);

    setLocalColumns(reorderedColumns);
  };

  const toggleColumnVisibility = (columnId: string) => {
    const updatedColumns = localColumns.map(col =>
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    setLocalColumns(updatedColumns);
  };

  const handleSave = () => {
    onColumnsChange(localColumns);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Columns</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Drag to reorder columns and toggle visibility
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {localColumns.map((column, index) => (
                    <Draggable key={column.id} draggableId={column.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center justify-between p-3 border rounded-lg ${
                            snapshot.isDragging ? 'bg-accent' : 'bg-card'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            </div>
                            <span className="text-sm font-medium">{column.label}</span>
                          </div>
                          <Button
                            variant={column.visible ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleColumnVisibility(column.id)}
                          >
                            {column.visible ? "Visible" : "Hidden"}
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
