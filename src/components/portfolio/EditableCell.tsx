
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditableCellProps {
  value: string | number;
  type: 'text' | 'number' | 'percentage' | 'currency';
  onSave: (value: string | number) => void;
  editable: boolean;
}

export const EditableCell = ({ value, type, onSave, editable }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    if (type === 'number' || type === 'percentage' || type === 'currency') {
      onSave(parseFloat(editValue.toString()) || 0);
    } else {
      onSave(editValue.toString());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const formatValue = (val: string | number) => {
    if (type === 'currency') return `£${Number(val).toLocaleString()}`;
    if (type === 'percentage') return `${val}%`;
    return val.toString();
  };

  if (!editable || !isEditing) {
    return (
      <div
        className={`${editable ? 'cursor-pointer hover:bg-accent/50 rounded px-2 py-1' : ''}`}
        onClick={() => editable && setIsEditing(true)}
      >
        {formatValue(value)}
      </div>
    );
  }

  if (type === 'text' && value.toString().length > 20) {
    return (
      <Textarea
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        className="min-h-[60px]"
        autoFocus
      />
    );
  }

  return (
    <Input
      type={type === 'text' ? 'text' : 'number'}
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={handleKeyPress}
      className="h-8"
      autoFocus
    />
  );
};
